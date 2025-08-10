import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, IonSearchbar, IonCard, IonLabel, IonItem, IonThumbnail, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonRouterOutlet, NavController } from '@ionic/angular/standalone';
import { addCircle, folder } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { StylesServiceService } from '../services/styles-service.service';



@Component({
  selector: 'app-ventana-inventario',
  templateUrl: './ventana-inventario.page.html',
  styleUrls: ['./ventana-inventario.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, CommonModule, FormsModule,IonIcon, IonRouterOutlet]
})
export class VentanaInventarioPage implements OnInit {

  private stylesService = inject(StylesServiceService)
  private navControl = inject(NavController)


  buttonIsEnabled = computed(()=>{
    return this.stylesService.getInvAddButton();
  });

  headerTitle = computed(()=>{
    return this.stylesService.getHeaderTitle();
  })

  constructor() {
    addIcons({folder,addCircle});
  }

  ngOnInit() {
  }

  changePage(){
    this.navControl.navigateForward("/tabs/inventario/agregar-elemento")
    console.log("NO IMPLEMENTADO")
  }

}
