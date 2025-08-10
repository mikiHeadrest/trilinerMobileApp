import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-inv-agregar-elemento',
  templateUrl: './inv-agregar-elemento.page.html',
  styleUrls: ['./inv-agregar-elemento.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class InvAgregarElementoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
