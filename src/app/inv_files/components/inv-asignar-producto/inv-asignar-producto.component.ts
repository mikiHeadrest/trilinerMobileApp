import { Component, inject, Input, OnInit } from '@angular/core';
import { ModalController, IonButton } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { OperacionService } from 'src/app/services/operacion.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Producto {
  nombre: string,
  id_producto: string,
  descripcion: string,
  unidades: number,
  imagen?: string,
}

@Component({
  selector: 'app-inv-asignar-producto',
  templateUrl: './inv-asignar-producto.component.html',
  imports: [IonButton, FormsModule, CommonModule],
  styleUrls: ['./inv-asignar-producto.component.scss'],
})
export class InvAsignarProductoComponent  implements OnInit {
  @Input() productoInicial!: Producto;

  private navControl = inject(NavController);
  private modalCtrl = inject(ModalController);
  private operacionService = inject(OperacionService);

  cantidad: number = 1;

  productos: Producto[] = [{id_producto: "0000 0000 0001", nombre: "Peluche Punpun Onodera - Oyasumi Punpun", descripcion: 'Pequeño peluche del despiadado y nefasto Punpun para que este en tu casa y lo abraces', unidades: 2}]
  
  constructor() { }

  ngOnInit() {}

  volver(){
    this.modalCtrl.dismiss();
  }
  agregar(){
    this.navControl.navigateForward('/tabs/monitoreo/registro-operacion');
    this.operacionService.agregarProducto(this.productoInicial.id_producto, this.cantidad);
    console.log(this.operacionService.productos());
    this.modalCtrl.dismiss();
  }
}
