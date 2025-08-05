import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonInput, IonTitle, IonToolbar, NavController } from '@ionic/angular/standalone';
import { HMMovimientosDiaComponent } from '../../components/hm-movimientos-dia/hm-movimientos-dia.component';
import { addIcons } from 'ionicons';
import { caretDownOutline, searchOutline } from 'ionicons/icons';

@Component({
  selector: 'app-hm-main-page',
  templateUrl: './hm-main-page.page.html',
  styleUrls: ['./hm-main-page.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HMMovimientosDiaComponent, IonContent, IonHeader, IonInput, IonIcon]
})
export class HMMainPagePage implements OnInit {

  private navControl = inject(NavController);

  constructor() {
    addIcons({searchOutline,caretDownOutline})
   }

  ngOnInit() {
  }

  searchByDate(date:string){
    this.navControl.navigateForward("/tabs/historial-movimientos/byDate/"+date);
  }

}
