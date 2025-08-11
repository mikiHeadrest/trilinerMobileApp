import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { duplicate } from 'ionicons/icons';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro-operacion',
  templateUrl: './registro-operacion.page.html',
  styleUrls: ['./registro-operacion.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonSelect, IonSelectOption,
    CommonModule, FormsModule]
})
export class RegistroOperacionPage implements OnInit {
  private navControl = inject(NavController);

  constructor() { 
    addIcons({duplicate});
  }

  ngOnInit() {
  }

  volver(){
    this.navControl.back();
  }

}
