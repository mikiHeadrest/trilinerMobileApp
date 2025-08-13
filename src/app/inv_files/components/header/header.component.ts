import { Component, inject, Input, OnInit } from '@angular/core';
import { IonHeader, IonIcon, NavController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircle, folder } from 'ionicons/icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonHeader,IonIcon]
})
export class HeaderComponent  implements OnInit {

  @Input() headerTitle!:string;
  @Input() hasSideButton?:boolean;
  @Input() buttonName?:string;
  @Input() clickButtonFunction?:() => void;

  navControl = inject(NavController)
  // SI LE PASAN FUNCIONES PONERLE DE NOMBRE
  // NAVCONTROL

  constructor() {
    addIcons({folder,addCircle})

    console.log("Header component loaded")

    // this.clickButtonFunction()

   }

  ngOnInit() {
    console.log("BooleanLoaded:" + this.hasSideButton?.valueOf())
    console.log("NameLoaded:" + this.buttonName?.valueOf())
    console.log("clickButtonFunction: " + this.clickButtonFunction?.call)

    if(!(this.clickButtonFunction && this.buttonName && this.hasSideButton)){
      console.error("PASA TODOS LOS COMPONENTES PARA QUE SE MUESTRE EL ICONO")
      console.log("BooleanLoaded:" + this.hasSideButton?.valueOf())
      console.log("NameLoaded:" + this.buttonName?.valueOf())
      console.log("clickButtonFunction: " + this.clickButtonFunction?.call)
    }

  }

  changePage(){

  }

}
