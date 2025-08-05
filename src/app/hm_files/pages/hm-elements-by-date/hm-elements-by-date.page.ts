import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonInput, IonTitle, IonToolbar, NavController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackCircle, search, searchOutline } from 'ionicons/icons';
import { ActivatedRoute } from '@angular/router';
import { HMInfoElementoComponent } from "../../components/hm-info-elemento/hm-info-elemento.component";


@Component({
  selector: 'app-hm-elements-by-date',
  templateUrl: './hm-elements-by-date.page.html',
  styleUrls: ['./hm-elements-by-date.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, CommonModule, FormsModule, IonIcon, IonInput, HMInfoElementoComponent]
})
export class HMElementsByDatePage implements OnInit {
  private activateRoute = inject(ActivatedRoute);
  private navControl = inject(NavController);
  date:string="";

  constructor() {
    addIcons({arrowBackCircle, searchOutline});
  }

  ngOnInit() {
    this.date = this.activateRoute.snapshot.paramMap.get('date') as string;
  }

  volver(){
    console.log("hello?")
    this.navControl.back();
    this.navControl.pop();
  }
}
