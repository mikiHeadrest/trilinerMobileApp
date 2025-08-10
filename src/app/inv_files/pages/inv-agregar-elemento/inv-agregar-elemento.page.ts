import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, NavController } from '@ionic/angular/standalone';
import { StylesServiceService } from 'src/app/services/styles-service.service';

@Component({
  selector: 'app-inv-agregar-elemento',
  templateUrl: './inv-agregar-elemento.page.html',
  styleUrls: ['./inv-agregar-elemento.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class InvAgregarElementoPage implements OnInit {

  private stylesService = inject(StylesServiceService)
  private navControl = inject(NavController)

  newElement: FormGroup;
  currenImgtUrl: string = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"

  constructor(private formBuild : FormBuilder) {

    // Agregar validators
    // Previo a insercion validar si el producto ya existe,

    // si existe mostrar un mensaje de remplazar datos o un msg de error

    this.newElement = this.formBuild.group({
      imageUrl:[''],
      id:[''],
      name:[''],
      franchise:[''],
      desc:['']
    })
  }

  ngOnInit() {
    this.stylesService.setHeaderTitle("Agregar un Nuevo Elemento")
    this.stylesService.setInvAddButton(false);
    console.log("man")
  }

  goBack(){
    this.stylesService.setHeaderTitle("Inventario")
    this.stylesService.setInvAddButton(true);
    this.navControl.back()
  }

}
