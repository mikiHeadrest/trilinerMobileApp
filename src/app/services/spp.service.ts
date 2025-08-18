// src/app/services/spp.service.ts
import { Injectable, signal } from '@angular/core';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Subject, Subscription } from 'rxjs';

export interface PairedDevice { id: string; name: string; }

type Grip = 'OPEN' | 'CLOSED' | 'MOV';

@Injectable({ providedIn: 'root' })
export class SppService {
  connected = signal(false);
  device    = signal<PairedDevice | null>(null);
  lastMsg   = signal('(sin datos)');

  // 👇 NUEVO: estado “conocido” desde la consola
  currentSlot = signal<number | null>(null);        // 1..8 si se conoce
  posZ        = signal<number>(0);
  posX        = signal<number>(0);
  grip        = signal<Grip>('CLOSED');
  ir          = signal<{Z:number; X:number; GRIP:number}>({Z:0, X:0, GRIP:0});

  private rx$ = new Subject<string>();
  rxStream   = this.rx$.asObservable();
  private sub?: Subscription;

  // Esperas puntuales a una línea (útil para “esperar llegada”)
  private waiters: Array<{re:RegExp; resolve:()=>void; reject:(e:Error)=>void; t:any}> = [];

  constructor(private bt: BluetoothSerial, private perms: AndroidPermissions) {}

  private async requestPerms() {
    const P:any = this.perms.PERMISSION;
    const wanted = [P.BLUETOOTH, P.BLUETOOTH_ADMIN, P.ACCESS_FINE_LOCATION, (P as any).BLUETOOTH_CONNECT, (P as any).BLUETOOTH_SCAN].filter(Boolean);
    const checks = await Promise.all(wanted.map(p => this.perms.checkPermission(p).then(r => r.hasPermission)));
    if (!checks.every(Boolean)) {
      const res = await this.perms.requestPermissions(wanted);
      if (!res.hasPermission) throw new Error('Permisos Bluetooth denegados');
    }
  }

  private async ensureEnabled() {
    await this.requestPerms();
    const on = await this.bt.isEnabled().catch(() => false as any);
    if (!on) await this.bt.enable();
  }

  async listPaired(): Promise<PairedDevice[]> {
    await this.ensureEnabled();
    const list = await this.bt.list();
    return list.map((d: any) => ({ id: d.id, name: d.name || d.id }));
  }

  async connectByMac(id: string, name?: string) {
    await this.ensureEnabled();
    try { await this.bt.isConnected(); this.connected.set(true); }
    catch {
      try { await this.bt.connect(id).toPromise(); }
      catch { await this.bt.connectInsecure(id).toPromise(); }
      this.connected.set(true);
    }
    this.device.set({ id, name: name || '' });

    this.sub?.unsubscribe();
    this.sub = this.bt.subscribe('\n').subscribe((s: string) => {
      const line = s.trim();
      if (!line) return;
      this.lastMsg.set(line);
      this.parseLine(line);         // 👈 actualiza estado
      this.rx$.next(line);
      this.notifyWaiters(line);     // 👈 resuelve esperas
    });
  }

  async disconnect() {
    try { await this.bt.disconnect(); } catch {}
    this.connected.set(false);
    this.device.set(null);
    this.sub?.unsubscribe();
    this.currentSlot.set(null);
  }

  async sendLine(text: string) {
    if (!this.connected()) throw new Error('No conectado');
    await this.bt.write(text.endsWith('\n') ? text : text + '\n');
  }

  // ---------- NUEVO: helpers de protocolo ----------
  private parseLine(line: string) {
    // POSZ:3 / POSX:5
    let m = line.match(/^POSZ:(\d+)/i);
    if (m) this.posZ.set(+m[1]);
    m = line.match(/^POSX:(\d+)/i);
    if (m) this.posX.set(+m[1]);

    // IR:Z=1,X=0,GRIP=1
    m = line.match(/^IR:\s*Z=(\d)\s*,\s*X=(\d)\s*,\s*GRIP=(\d)/i);
    if (m) this.ir.set({ Z:+m[1], X:+m[2], GRIP:+m[3] });

    // GRIP:OPEN / GRIP:CLOSE / GRIP:OPENING/CLOSING
    if (/^GRIP:OPEN$/i.test(line))   this.grip.set('OPEN');
    else if (/^GRIP:CLOSE$/i.test(line)) this.grip.set('CLOSED');
    else if (/^GRIP:(OPENING|CLOSING)$/i.test(line)) this.grip.set('MOV');

    // Confirmaciones de llegada:
    // - “LLEGO POS3” (si tu firmware lo manda)
    // - “JOB:DONE” (si usas secuencia completa)
    // - También puedes inferir por DONEZ/DONEX si tu flujo siempre llega a HOME
    m = line.match(/^LLEGO\s+POS(\d+)/i);
    if (m) this.currentSlot.set(+m[1]);
    if (/^JOB:DONE$/i.test(line)) {
      // si tu firmware no manda “LLEGO POSx”, intenta inferir según último comando enviado (opcional)
      // aquí no cambiamos currentSlot porque puede haber vuelto a HOME
    }
  }

  private notifyWaiters(line: string) {
    // resuelve cualquiera cuyo RegExp haga match
    this.waiters = this.waiters.filter(w => {
      if (w.re.test(line)) {
        clearTimeout(w.t); w.resolve(); return false;
      }
      return true;
    });
  }

  private waitFor(re: RegExp, timeoutMs = 6000): Promise<void> {
    return new Promise((resolve, reject) => {
      const t = setTimeout(() => {
        reject(new Error('timeout esperando: ' + re));
      }, timeoutMs);
      this.waiters.push({ re, resolve, reject, t });
    });
  }

  // Mapa a..h -> POS1..POS8 y espera confirmación
  async moveToSlot(letterOrNumber: string | number) {
    const map: Record<string, number> = { a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8 };
    const n = typeof letterOrNumber === 'number'
      ? letterOrNumber
      : map[(letterOrNumber || '').toLowerCase()];
    if (!n || n < 1 || n > 8) throw new Error('Ubicación inválida');

    await this.sendLine(`POS${n}`);
    // Espera confirmación flexible según tu firmware:
    //  - LLEGO POSn
    //  - o JOB:DONE
    //  - o DONEZ/DONEX (si no hay JOB)
    await Promise.race([
      this.waitFor(new RegExp(`^LLEGO\\s+POS${n}$`, 'i')),
      this.waitFor(/^JOB:DONE$/i),
      this.waitFor(/^DONEZ:\d+$/i),
      this.waitFor(/^DONEX:\d+$/i),
    ]).catch(() => {}); // no falles si el firmware no emite estas
    this.currentSlot.set(n); // último target, útil para UI
  }
}
