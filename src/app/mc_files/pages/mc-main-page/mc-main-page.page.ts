import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, IonButton, IonItem, IonAvatar, IonLabel, IonBadge, IonGrid, IonRow, IonCol} from '@ionic/angular/standalone';
import { airplaneOutline, alertCircleOutline, arrowDown, arrowDownOutline, arrowUpOutline, cubeOutline, desktop } from 'ionicons/icons';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';

import { monitoreoElement, SupabaseService, monitoreoLatestElement } from 'src/app/services/supabase.service';

import { SppService } from 'src/app/services/spp.service';

  interface OperacionProducto {
      id: number,
      tipo: string,
      createdAt: string,
      unidades: number,
      maquinaId: number,
      productoId: number,
  }

@Component({
  selector: 'app-mc-main-page',
  templateUrl: './mc-main-page.page.html',
  styleUrls: ['./mc-main-page.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonButton, IonGrid, IonRow, IonCol,
  ]
})
export class McMainPagePage implements OnInit {
  recentElements:WritableSignal<monitoreoElement[]> = signal([]);
  latestElement:WritableSignal<monitoreoLatestElement>
  = signal({
    estado:false,
    tipo_operacion:false,
    id_operacioninventario: 0,
    isallocated:false,
    unidades:0,
    id_producto: 0,
    imagen:"https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
  }); // se cargan con valores por defecto

  supabaseService = inject(SupabaseService)
  private navControl = inject(NavController);
  private spp = inject(SppService);

  totalDespacho: number = 0;
  totalRecepcion: number = 0;
  fechaActual: String = new Date().toISOString().split('T')[0];

  constructor() {
    addIcons({desktop, arrowUpOutline, arrowDownOutline, alertCircleOutline, cubeOutline, airplaneOutline, arrowDown});
  }

  async ngOnInit() {

    this.recentElements.set(await this.supabaseService.getMostRecentOperations());

    this.totalDespacho = await this.supabaseService.getTotalOperaciones(true);
    this.totalRecepcion = await this.supabaseService.getTotalOperaciones(false);

    this.latestElement.set(await this.supabaseService.getLatestProductoOperation());

  }


  irDespacho(){
    this.navControl.navigateForward("/tabs/monitoreo/registro-operacion");
  }

  irPrueba(){
    if(this.spp.connected()){
      this.irDespacho();
    }else{
      this.navControl.navigateForward("/conexion-bluetooth")
    }
  }

  trackById(index: number, item: { id: number }) {
    return item.id;
  }

  iconoMovimiento(m: OperacionProducto) {
    return m.tipo === 'Despacho' ? 'arrow-up-outline' : 'arrow-down-outline';
  }

  getRecentElements(){
    return this.recentElements();
  }


}
