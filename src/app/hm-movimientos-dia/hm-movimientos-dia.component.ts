import { Component, Input, OnInit } from '@angular/core';
import { HMInfoElementoComponent } from "../hm-info-elemento/hm-info-elemento.component";

@Component({
  selector: 'app-hm-movimientos-dia',
  templateUrl: './hm-movimientos-dia.component.html',
  styleUrls: ['./hm-movimientos-dia.component.scss'],
  imports: [HMInfoElementoComponent],
})
export class HMMovimientosDiaComponent  implements OnInit {

  @Input() currentDate?:string;

  constructor() { }

  ngOnInit() {}

}
