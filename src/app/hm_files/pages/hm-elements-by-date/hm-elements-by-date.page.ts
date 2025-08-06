import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonInput, IonTitle, IonToolbar, NavController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackCircle, search, searchOutline } from 'ionicons/icons';
import { ActivatedRoute } from '@angular/router';
import { HMInfoElementoComponent } from "../../components/hm-info-elemento/hm-info-elemento.component";
import { HM_ElementModel } from 'src/app/models/hm_ElementModel.models';

@Component({
  selector: 'app-hm-elements-by-date',
  templateUrl: './hm-elements-by-date.page.html',
  styleUrls: ['./hm-elements-by-date.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, CommonModule, FormsModule, IonIcon, IonInput]
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
    // Hacer consulta en la base de datos que busce operaciones productos que tengan como parametro
    // created_at = date
    //!! Fecha de Creacion = fecha a Verificar
    // Primero contar el numero de elementos para hacer la paginacion

    //luego cargar elementos

  }

  volver(){
    console.log("hello?")
    this.navControl.back();
    this.navControl.pop();
  }
}
