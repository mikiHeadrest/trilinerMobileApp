import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, IonButton, IonItem, IonAvatar, IonLabel, IonChip, IonBadge, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { airplaneOutline, alertCircleOutline, arrowDownOutline, arrowUpOutline, cubeOutline, desktop } from 'ionicons/icons';
import { addIcons } from 'ionicons';


@Component({
  selector: 'app-ventana-monitoreo',
  templateUrl: './ventana-monitoreo.page.html',
  styleUrls: ['./ventana-monitoreo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonButton, IonItem, IonAvatar, IonLabel, IonChip, IonBadge, IonGrid, IonRow, IonCol]
})
export class VentanaMonitoreoPage implements OnInit {

  constructor() {
    addIcons({desktop, arrowUpOutline, arrowDownOutline, alertCircleOutline, cubeOutline, airplaneOutline});
  }

  ngOnInit() {
  }

}
