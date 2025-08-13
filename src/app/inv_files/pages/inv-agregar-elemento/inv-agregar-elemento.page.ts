import { Component, computed, inject, Input, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, NavController, ToastController } from '@ionic/angular/standalone';
import { HeaderComponent } from "../../components/header/header.component";
import { Camera, CameraResultType } from '@capacitor/camera';
import { StorageService } from 'src/app/services/storage.service';
import { provideHttpClient } from '@angular/common/http';
import { SupabaseService } from 'src/app/services/supabase.service';

import { ProductoDB } from 'src/app/services/supabase.service';
import { alertCircleOutline, alertOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
// No se ocupa el modelo de productos :3

@Component({
  selector: 'app-inv-agregar-elemento',
  templateUrl: './inv-agregar-elemento.page.html',
  styleUrls: ['./inv-agregar-elemento.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, ReactiveFormsModule,IonIcon],
})
export class InvAgregarElementoPage implements OnInit {

  private storageService = inject(StorageService)
  private supabaseService = inject(SupabaseService)
  private toastControl = inject(ToastController);
  @ViewChild(FormGroupDirective) private formDirective!: FormGroupDirective;

  private formBuild = inject(FormBuilder)
  private navControl = inject(NavController)

  newElement: FormGroup;
  currentImgUrl: string = ""

  constructor() {
    this.newElement = this.formBuild.group({
      imagen:[''],
      id_producto:[''],
      nombre:['',[Validators.required]],
      franquicia:['',[Validators.required]],
      descripcion:['',[Validators.required]],
    })
  }

  async ngOnInit() {
    addIcons({alertCircleOutline, alertOutline});

    this.currentImgUrl = this.storageService.getUndefinedImage();
    const id =  await this.supabaseService.calculateLastRegisteredId() + 1;
    this.newElement.patchValue({'id_producto': id })
  }

  goBack(){
    this.navControl.back()
  }

  async takePhoto(){

    const image = await Camera.getPhoto({
      quality:60,
      allowEditing:false,
      resultType : CameraResultType.DataUrl
    });

    console.log(image)

    try{
      this.currentImgUrl = "" + await image.dataUrl
    }
    catch(e){
      console.error("Error al subir la iamgen: " + e)
    }

  }

  async submitForm(){

    if(this.newElement.invalid){
      console.error("No se hara insercion, propiedades invalidas")
    }
    else{

      let imgbbUrl : string|null = null;

      // 1. Primero se sube la imagen
      try{
        if(this.currentImgUrl != this.storageService.getUndefinedImage()){
          imgbbUrl = await this.storageService.uploadBase64Image(this.currentImgUrl);
          console.log("Foto guardada correctamenre!");
        }

        this.newElement.patchValue({'imagen':imgbbUrl});
        const newElement:ProductoDB = this.newElement.value;

        console.log(JSON.stringify(this.newElement.value))

        console.log("IDProd: "+newElement.id_producto)
        console.log("Nombre: "+newElement.nombre)
        console.log("Desc:"+newElement.descripcion)
        console.log("Franquicia:"+newElement.franquicia)

        this.supabaseService.insertProducto(newElement);
        this.createToast("Insercion exitosa dentro de la base de Datos...")

      }
      catch(e){
        // toast con mensaje de error
        this.createToast("Error al crear nueva insercion")
        console.error("Error al subir un nuevo elemento:" + e);
      }
      // this.dismissLoader('uploadImg')
      // espera

    }
  }

  clearData(){
    this.formDirective.reset()
    this.newElement.reset()

  }

  async createToast(errorMsg:string){
    const toast = this.toastControl.create({
      message:errorMsg,
      position:'bottom',
      duration:2000
    })
  }


}
