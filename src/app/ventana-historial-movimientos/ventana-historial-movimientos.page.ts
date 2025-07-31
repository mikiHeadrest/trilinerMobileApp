import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { time } from 'ionicons/icons';

@Component({
  selector: 'app-ventana-historial-movimientos',
  templateUrl: './ventana-historial-movimientos.page.html',
  styleUrls: ['./ventana-historial-movimientos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon]
})
export class VentanaHistorialMovimientosPage implements OnInit {

  constructor() {
    addIcons({time})
  }

  ngOnInit() {
  }

}
