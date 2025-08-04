import { Component, Input, OnInit } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowDown } from 'ionicons/icons';


@Component({
  selector: 'app-hm-info-elemento',
  templateUrl: './hm-info-elemento.component.html',
  styleUrls: ['./hm-info-elemento.component.scss'],
  imports: [IonIcon],
})
export class HMInfoElementoComponent  implements OnInit {

  // Crear un modelo el CUAL CONTENGA ESTOS DATOS
  // Para posteriormente pasarlos

  @Input() urlImage!:string;
  @Input() TypeOfOperation!:boolean;
  // True: Despacho
  // False: Recepcion
  @Input() quantity!:string;

  @Input() name!:string;
  @Input() franquicia!:string;
  @Input() id_producto!:string;
  @Input() hour !:string;


  constructor() {
    addIcons({arrowDown});
  }

  ngOnInit() {}

}
