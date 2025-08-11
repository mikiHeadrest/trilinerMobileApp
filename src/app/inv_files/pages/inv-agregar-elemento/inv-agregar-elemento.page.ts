import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, NavController } from '@ionic/angular/standalone';
import { HeaderComponent } from "../../components/header/header.component";
import { Camera, CameraResultType } from '@capacitor/camera';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-inv-agregar-elemento',
  templateUrl: './inv-agregar-elemento.page.html',
  styleUrls: ['./inv-agregar-elemento.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent]
})
export class InvAgregarElementoPage implements OnInit {

  // private storageService = inject(StorageService)

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
  }

  goBack(){
    this.navControl.back()
  }

  // async takePhoto(){
  //   const image = await Camera.getPhoto({
  //     quality:60,
  //     allowEditing:false,
  //     resultType : CameraResultType.DataUrl
  //   });

  //   console.log(image)

  //   // this.presentLoading('uploadImg','Subiendo imagen dentro de la base de datos')

  //   try{
  //     this.currenImgtUrl = await this.storageService.uploadBase64Image(image.dataUrl!);
  //     console.log("Foto guardada en: " + this.currenImgtUrl);
  //   }
  //   catch(e){
  //     // toast con mensaje de derror
  //   }
  //   // this.dismissLoader('uploadImg')
  //   // espera

  // }

}
