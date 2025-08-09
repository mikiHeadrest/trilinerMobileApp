import { Component, inject, Input, OnInit } from '@angular/core';
import { HMInfoElementoComponent } from "../hm-info-elemento/hm-info-elemento.component";
import { NavController } from '@ionic/angular';
import { HM_ElementModel } from 'src/app/models/hm_ElementModel.models';

@Component({
  selector: 'app-hm-movimientos-dia',
  templateUrl: './hm-movimientos-dia.component.html',
  styleUrls: ['./hm-movimientos-dia.component.scss'],
  imports: [HMInfoElementoComponent],
})
export class HMMovimientosDiaComponent  implements OnInit {

  private navControl = inject(NavController);

  @Input() currentDate!:string;
  @Input() elementList!:HM_ElementModel[];

  constructor() { }

  ngOnInit() {}

  searchByDate(date:string){
    this.navControl.navigateForward("/tabs/historial-movimientos/byDate/"+date);
    // En base al date recibido se hara una consulta en la base de datos que llene los elementos
  }


}
