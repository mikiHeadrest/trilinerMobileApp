import { Component, inject, OnInit } from '@angular/core';
import { ModalController, IonButton } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';

interface Producto {
  nombre: string,
  id: string,
  descripcion: string,
  unidades: number
}

@Component({
  selector: 'app-inv-asignar-producto',
  templateUrl: './inv-asignar-producto.component.html',
  imports: [IonButton],
  styleUrls: ['./inv-asignar-producto.component.scss'],
})
export class InvAsignarProductoComponent  implements OnInit {
  private navControl = inject(NavController);
  private modalCtrl = inject(ModalController);

  productos: Producto[] = [{id: "0000 0000 0001", nombre: "Peluche Punpun Onodera - Oyasumi Punpun", descripcion: 'Pequeño peluche del despiadado y nefasto Punpun para que este en tu casa y lo abraces', unidades: 2}]
  
  constructor() { }

  ngOnInit() {}

  volver(){
    this.modalCtrl.dismiss();
  }
}
