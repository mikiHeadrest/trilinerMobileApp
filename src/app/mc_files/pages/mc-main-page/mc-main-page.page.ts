import { Component, inject, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, IonButton, IonItem, IonAvatar, IonLabel, IonBadge, IonGrid, IonRow, IonCol} from '@ionic/angular/standalone';
import { airplaneOutline, alertCircleOutline, arrowDownOutline, arrowUpOutline, cubeOutline, desktop } from 'ionicons/icons';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { SupabaseService } from 'src/app/services/supabase.service';

  interface Maquina{
    id: number,
    nombre: string,
    descripcion?: string,
    modelo: string,
    createdAt: string
  }

  interface Producto{
    id: number,
    nombre: string,
    imagen: string,
    descripcion?: string,
    createdAt: string,
    franquicia?: string
  }

  interface OperacionInventario{
    id: number,
    tipo: string,
    createdAt: string,
    estado: string
  }
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
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonButton, IonItem, IonAvatar, IonLabel, IonBadge, IonGrid, IonRow, IonCol,
  ]
})
export class McMainPagePage implements OnInit {
  totalDespacho: number = 0;
  totalRecepcion: number = 0;
  fechaActual: String = new Date().toISOString().split('T')[0];

  maquinas: Maquina[] = [
    { id: 1, nombre: 'Linea A', modelo: '0000-0000-0001', createdAt: '2025-07-27T21:30:00Z' }
  ];

  productos: Producto[] = [
    { id: 4, nombre: 'Peluche Ralsei sin Gorro', imagen: 'assets/ralsei.png', createdAt: '2025-07-27T21:31:00Z', franquicia: "UPS" },
    { id: 5, nombre: 'Peluche Genocida Sans',    imagen: 'assets/sans.png',   createdAt: '2025-07-27T21:32:00Z', franquicia: "UPS" },
    { id: 2, nombre: 'Peluche Goku',             imagen: 'assets/goku.png',   createdAt: '2025-07-27T21:33:00Z', franquicia: "UPS" },
  ];

  opsInv: OperacionInventario[] = [
    { id: 2, tipo: 'recepcion', createdAt: '2025-07-27T21:50:00Z', estado: 'abierta' }
  ];

  movs: OperacionProducto[] = [
    { id: 101, tipo: 'Despacho',  createdAt: '21:52', unidades: 2, maquinaId: 1, productoId: 4 },
    { id: 102, tipo: 'Recepcion', createdAt: '21:50', unidades: 2, maquinaId: 1, productoId: 5 },
    { id: 103, tipo: 'Recepcion', createdAt: '21:46', unidades: 3, maquinaId: 1, productoId: 2 },
  ];

  private navControl = inject(NavController);
  productMap = new Map<number, Producto>();
  
  constructor(private supabase: SupabaseService) { 
    addIcons({desktop, arrowUpOutline, arrowDownOutline, alertCircleOutline, cubeOutline, airplaneOutline});
  }

  async ngOnInit() {
    this.productMap = new Map(this.productos.map(p => [p.id, p]));
    this.totalDespacho = await this.supabase.getTotalOperaciones(true);
    this.totalRecepcion = await this.supabase.getTotalOperaciones(false);
  }

  productoDe(id: number) {
    return this.productMap.get(id);
  }

  irDespacho(){
    this.navControl.navigateForward("/tabs/monitoreo/registro-operacion");
  }

  trackById(index: number, item: { id: number }) {
    return item.id;
  }

  iconoMovimiento(m: OperacionProducto) {
    return m.tipo === 'Despacho' ? 'arrow-up-outline' : 'arrow-down-outline';
  }

}
