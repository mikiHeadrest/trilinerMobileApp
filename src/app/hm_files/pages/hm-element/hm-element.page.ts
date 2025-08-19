import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HM_ElementModel } from 'src/app/models/hm_ElementModel.models';
import { histMovsInfo, SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-hm-element',
  templateUrl: './hm-element.page.html',
  styleUrls: ['./hm-element.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton]
})
export class HMElementPage implements OnInit {

  private navControl = inject(NavController);
  private activatedRoute = inject(ActivatedRoute);
  private supabaseService = inject(SupabaseService)

  // hice que tuviera estos valores por defecto para que cargara
  // HACER QUE LA PAGINA CARGE TODO Y DESPUES SE HABRA, no hacer esto
  elementInfo: HM_ElementModel = {
    id_operacionProducto: parseInt(this.activatedRoute.snapshot.queryParamMap.get('id_operacionProducto')!),
      id_producto:  1,

      imagen: "cargando",
      nombre: "cargandp",
      franquicia: "cargando",

      tipo_operacion: true,

      unidades: 1,

      modified_at:new Date(Date.now()),
  };

  infoFaltante:histMovsInfo = {
    isallocated:false,
    nombre_op:"Cargando..",
    desc_op:"Cargando..",
    fecha: new Date()
  }


  constructor() { }

  async ngOnInit() {

    if ((this.activatedRoute.snapshot.queryParamMap.get('tipo_operacion')) == 'true' ){
      this.elementInfo.tipo_operacion == true;
    }
    else{
      this.elementInfo.tipo_operacion == false
    }
    const id_operacionProd = parseInt(this.activatedRoute.snapshot.queryParamMap.get('id_operacionProducto')!)
    this.infoFaltante = await this.supabaseService.getAllInfoById(id_operacionProd)

    this.elementInfo={
      id_operacionProducto: parseInt(this.activatedRoute.snapshot.queryParamMap.get('id_operacionProducto')!),
      id_producto:  parseInt(this.activatedRoute.snapshot.queryParamMap.get('id_producto')!),

      imagen: this.activatedRoute.snapshot.queryParamMap.get('imagen')!,
      nombre: this.activatedRoute.snapshot.queryParamMap.get('nombre')!,
      franquicia: this.activatedRoute.snapshot.queryParamMap.get('franquicia')!,

      tipo_operacion: this.elementInfo.tipo_operacion,

      unidades: parseInt(this.activatedRoute.snapshot.queryParamMap.get('unidades')!),

      modified_at: new Date(this.activatedRoute.snapshot.queryParamMap.get('modified_at')!), //De Operacion-Producto
    }

    console.log("BOOLEAN?: "+this.elementInfo.tipo_operacion);
    console.log("date?: "+this.elementInfo.modified_at);

  }

  volver(){
    this.navControl.back();
  }

}
