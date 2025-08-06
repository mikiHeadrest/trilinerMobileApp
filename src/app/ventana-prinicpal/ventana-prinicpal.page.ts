import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { calendarOutline } from 'ionicons/icons';
import {
  IonAvatar,
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  IonIcon,
} from '@ionic/angular/standalone';

addIcons({
  'calendar-outline': calendarOutline,
});

interface Operacion {
  tipo: string;
  nombre: string;
  unidades: number;
  idMontacargas: string;
  origen: string;
  fecha: Date;
  img: string;
}

@Component({
  selector: 'app-ventana-prinicpal',
  templateUrl: './ventana-prinicpal.page.html',
  styleUrls: ['./ventana-prinicpal.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonTitle,
    IonContent,
    IonAvatar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonIcon,
  ],
})
export class VentanaPrinicpalPage implements OnInit {
  estado: string = 'En Operación';
  fecha: string = '06-08-25';
  recepcion: number = 100;
  despacho: number = 100;

  historial: Operacion[] = [
    {
      tipo: 'Despacho',
      nombre: 'Peluche Punpun Onodera - Oyasumi Punpun',
      unidades: 1,
      idMontacargas: '0000 0001',
      origen: 'FedEx',
      fecha: new Date(2025, 6, 22, 7, 20),
      img: 'assets/punpun.png',
    },
    {
      tipo: 'Recepción',
      nombre: "Peluche Toy Bonnie - Five Nights At Freddy's",
      unidades: 21,
      idMontacargas: '0000 0001',
      origen: 'Mercado Libre',
      fecha: new Date(2025, 6, 22, 7, 10),
      img: 'assets/bonnie.png',
    },
    {
      tipo: 'Recepción',
      nombre: 'Consola Nintendo Switch 2 - N...',
      unidades: 1,
      idMontacargas: '0000 0001',
      origen: 'Nintendo',
      fecha: new Date(2025, 6, 21, 21, 58),
      img: 'assets/switch2.png',
    },
  ];

  consultas = [
    {
      titulo: 'Producto con mayor número de despachos',
      nombre: 'Peluche Punpun Onodera - Oyasumi Punpun',
      id: '000 000 001',
      unidades: 32,
      img: 'assets/punpun.png',
    },
    {
      titulo: 'Producto con mayor número de Stock',
      nombre: "Peluche Toy Bonnie - Five Nights At Freddy's",
      id: '000 000 001',
      unidades: 42,
      img: 'assets/bonnie.png',
    },
    {
      titulo: 'Día con mayor número de Operaciones',
      fecha: '21 - Junio - 2025',
      recepcion: 20,
      despacho: 40,
      total: 60,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
