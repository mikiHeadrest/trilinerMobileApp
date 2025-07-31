import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { folder } from 'ionicons/icons';
import { addIcons } from 'ionicons';



@Component({
  selector: 'app-ventana-inventario',
  templateUrl: './ventana-inventario.page.html',
  styleUrls: ['./ventana-inventario.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonIcon]
})
export class VentanaInventarioPage implements OnInit {

  constructor() {
    addIcons({folder});
  }

  ngOnInit() {
  }

}
