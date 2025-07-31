import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonAvatar, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-ventana-prinicpal',
  templateUrl: './ventana-prinicpal.page.html',
  styleUrls: ['./ventana-prinicpal.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonAvatar]
})
export class VentanaPrinicpalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
