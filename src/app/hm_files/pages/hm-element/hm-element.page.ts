import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-hm-element',
  templateUrl: './hm-element.page.html',
  styleUrls: ['./hm-element.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton]
})
export class HMElementPage implements OnInit {

  private navControl = inject(NavController);
  private activatedRoute = inject(ActivatedRoute);
  product_id:string="";

  constructor() { }

  ngOnInit() {
    // actualizar para que haga un query buscando todos los datos que ocupa
    this.product_id = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  volver(){
    this.navControl.back();
  }

}
