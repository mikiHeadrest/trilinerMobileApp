// src/app/services/spp.service.ts
import { Injectable, signal } from '@angular/core';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Subject, Subscription } from 'rxjs';

export interface PairedDevice { id: string; name: string; }

@Injectable({ providedIn: 'root' })
export class SppService {
  connected = signal(false);
  device = signal<PairedDevice | null>(null);
  lastMsg = signal('(sin datos)');

  private rx$ = new Subject<string>();
  rxStream = this.rx$.asObservable();
  private sub?: Subscription;

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
    try { await this.bt.isConnected(); this.connected.set(true); return; } catch {}
    try { await this.bt.connect(id).toPromise(); }
    catch { await this.bt.connectInsecure(id).toPromise(); }

    this.connected.set(true);
    this.device.set({ id, name: name || '' });

    this.sub?.unsubscribe();
    this.sub = this.bt.subscribe('\n').subscribe((s: string) => {
      const line = s.trim();
      this.lastMsg.set(line);
      this.rx$.next(line);
    });
  }

  async disconnect() {
    try { await this.bt.disconnect(); } catch {}
    this.connected.set(false);
    this.device.set(null);
    this.sub?.unsubscribe();
  }

  async sendLine(text: string) {
    if (!this.connected()) throw new Error('No conectado');
    await this.bt.write(text.endsWith('\n') ? text : text + '\n');
  }
}
