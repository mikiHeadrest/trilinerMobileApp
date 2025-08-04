import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonInput, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowDown, caretDownOutline, searchOutline, time } from 'ionicons/icons';
import { HMMovimientosDiaComponent } from "../hm-movimientos-dia/hm-movimientos-dia.component";


@Component({
  selector: 'app-ventana-historial-movimientos',
  templateUrl: './ventana-historial-movimientos.page.html',
  styleUrls: ['./ventana-historial-movimientos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonInput, HMMovimientosDiaComponent]
})
export class VentanaHistorialMovimientosPage implements OnInit {

  constructor() {
    addIcons({time,searchOutline, caretDownOutline, arrowDown})
  }

  ngOnInit() {
  }

}
