import { Component, inject, Input, OnInit } from '@angular/core';
import { HMInfoElementoComponent } from "../hm-info-elemento/hm-info-elemento.component";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-hm-movimientos-dia',
  templateUrl: './hm-movimientos-dia.component.html',
  styleUrls: ['./hm-movimientos-dia.component.scss'],
  imports: [HMInfoElementoComponent],
})
export class HMMovimientosDiaComponent  implements OnInit {

  private navControl = inject(NavController);

  @Input() currentDate!:string;


  constructor() { }

  ngOnInit() {}

  searchByDate(date:string){
    this.navControl.navigateForward("/tabs/historial-movimientos/byDate/"+date);
  }


}
