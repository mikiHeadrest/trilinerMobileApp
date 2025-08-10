import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, IonButton, IonItem, IonAvatar, IonLabel, IonBadge, IonGrid, IonRow, IonCol} from '@ionic/angular/standalone';
import { airplaneOutline, alertCircleOutline, arrowDownOutline, arrowUpOutline, cubeOutline, desktop } from 'ionicons/icons';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-mc-main-page',
  templateUrl: './mc-main-page.page.html',
  styleUrls: ['./mc-main-page.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonButton, IonItem, IonAvatar, IonLabel, IonBadge, IonGrid, IonRow, IonCol]
})
export class McMainPagePage implements OnInit {
  private navControl = inject(NavController);
  
  constructor() { 
    addIcons({desktop, arrowUpOutline, arrowDownOutline, alertCircleOutline, cubeOutline, airplaneOutline});
  }

  ngOnInit() {
  }

  irDespacho(){
    this.navControl.navigateForward("/tabs/monitoreo/registro-operacion");
  }

}
