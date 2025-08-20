import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonRouterOutlet,
} from '@ionic/angular/standalone';


@Component({
  selector: 'app-ventana-inventario',
  templateUrl: './ventana-inventario.page.html',
  styleUrls: ['./ventana-inventario.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonRouterOutlet
  ],
})
export class VentanaInventarioPage implements OnInit {
  constructor() {

  }

  async ngOnInit() {

  }


}
