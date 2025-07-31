import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';


@Component({
  selector: 'app-ventana-config',
  templateUrl: './ventana-config.page.html',
  styleUrls: ['./ventana-config.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon]
})
export class VentanaConfigPage implements OnInit {

  constructor() {
    addIcons({personCircleOutline});
  }

  ngOnInit() {
  }

}
