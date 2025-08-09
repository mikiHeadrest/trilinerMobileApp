import { NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowDown } from 'ionicons/icons';

import { HM_ElementModel } from 'src/app/models/hm_ElementModel.models';

@Component({
  selector: 'app-hm-info-elemento',
  templateUrl: './hm-info-elemento.component.html',
  styleUrls: ['./hm-info-elemento.component.scss'],
  imports: [IonIcon,NgStyle],
})
export class HMInfoElementoComponent  implements OnInit {

  // Crear un modelo el CUAL CONTENGA ESTOS DATOS
  // Para posteriormente pasarlos

  @Input() elementInfo!:HM_ElementModel;
  //^ elementoInfo.tipo_operacion:boolean;
  // True: Despacho
  // False: Recepcion

  constructor(private router : Router) {
    addIcons({arrowDown});
  }

  ngOnInit() {}

  infoElement(elementInfo:HM_ElementModel){
    this.router.navigate(['/tabs/historial-movimientos/elemento/'+elementInfo.id_producto],{queryParams:elementInfo});
  }

}
