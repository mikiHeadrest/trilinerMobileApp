import { NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonIcon} from '@ionic/angular/standalone';
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
  elementDate?:Date;
  isLoading:boolean = true;
  //^ elementoInfo.tipo_operacion:boolean;
  // True: Despacho
  // False: Recepcion


  constructor(private router : Router) {
    addIcons({arrowDown});

  }

  async ngOnInit() {
    // this.presentLoading('loadHistorialMovs',"Cargando el Historial de Movimientos");
    // console.log("Elemento recibido: "+JSON.stringify(this.elementInfo))
    if(this.elementInfo.modified_at){
      // por defecto los Dates se convierten a string, por lo que tuve que crear una variable
      // que lo convierta a Date
      this.elementDate = new Date(this.elementInfo.modified_at)
    }
    // this.dismissLoader('loadHistorialMovs');

  }

  infoElement(elementInfo:HM_ElementModel){
    this.router.navigate(['/tabs/historial-movimientos/elemento/'+elementInfo.id_producto],{queryParams:elementInfo});
  }

}
