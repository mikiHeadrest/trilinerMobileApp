import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonInput, IonRouterOutlet, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowDown, caretDownOutline, searchOutline, time } from 'ionicons/icons';



@Component({
  selector: 'app-ventana-historial-movimientos',
  templateUrl: './ventana-historial-movimientos.page.html',
  styleUrls: ['./ventana-historial-movimientos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, CommonModule, FormsModule, IonIcon, IonRouterOutlet]
})
export class VentanaHistorialMovimientosPage implements OnInit {

  constructor() {
    addIcons({time,searchOutline, caretDownOutline, arrowDown})
  }

  ngOnInit() {
  }

}
