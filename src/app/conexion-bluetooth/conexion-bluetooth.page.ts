import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton, IonSearchbar, IonIcon, IonAvatar, IonToast, IonSkeletonText
} from '@ionic/angular/standalone';
import { SppService, PairedDevice } from '../services/spp.service';

@Component({
  selector: 'app-conexion-bluetooth',
  templateUrl: './conexion-bluetooth.page.html',
  styleUrls: ['./conexion-bluetooth.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonContent,
    IonList, IonItem, IonLabel, IonButton, IonSearchbar, IonIcon, IonAvatar, IonToast, IonSkeletonText
  ]
})
export class ConexionBluetoothPage {
  paired: PairedDevice[] = [];
  filtered: PairedDevice[] = [];
  loading = false;

  // nuevo estado
  isConnected = false;
  connectedDevice: PairedDevice | null = null;

  // toast
  toastOpen = false;
  toastMsg = '';

  constructor(private spp: SppService, private router: Router) {}

  async ionViewWillEnter() {
    await this.scanDevices();
    // si ya estaba conectado desde otra pantalla, reflejarlo
    if (this.spp.connected()) {
      this.isConnected = true;
      const dev = this.spp.device();
      this.connectedDevice = dev ? { id: dev.id, name: dev.name } : null;
    }
  }

  async scanDevices() {
    this.loading = true;
    try {
      this.paired = await this.spp.listPaired();
      this.filtered = [...this.paired];
    } catch (e) {
      console.error('Listado falló:', e);
      this.paired = [];
      this.filtered = [];
    } finally {
      this.loading = false;
    }
  }

  async refreshDevices() { await this.scanDevices(); }

  filter(q: string | null | undefined) {
    const s = (q || '').toLowerCase();
    this.filtered = this.paired.filter(d =>
      (d.name || '').toLowerCase().includes(s) || (d.id || '').toLowerCase().includes(s)
    );
  }

  async connect(d: PairedDevice) {
    try {
      await this.spp.connectByMac(d.id, d.name);
      this.isConnected = true;
      this.connectedDevice = d;
      this.toastMsg = `Conectado a ${d.name || d.id}`;
      this.toastOpen = true;
    } catch (e) {
      console.error('Error conectando:', e);
      this.toastMsg = 'No se pudo conectar';
      this.toastOpen = true;
    }
  }

  goNext() {
    this.router.navigateByUrl('/tabs/monitoreo/registro-operacion');
  }
}
