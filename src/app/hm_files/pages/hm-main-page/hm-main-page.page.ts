import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonInput, IonTitle, IonToolbar, NavController } from '@ionic/angular/standalone';
import { HMMovimientosDiaComponent } from '../../components/hm-movimientos-dia/hm-movimientos-dia.component';
import { addIcons } from 'ionicons';
import { caretDownOutline, searchOutline } from 'ionicons/icons';
import { HM_ElementModel } from 'src/app/models/hm_ElementModel.models';


@Component({
  selector: 'app-hm-main-page',
  templateUrl: './hm-main-page.page.html',
  styleUrls: ['./hm-main-page.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HMMovimientosDiaComponent, IonContent, IonHeader, IonInput, IonIcon]
})
export class HMMainPagePage implements OnInit {


  listOfItems: [string,HM_ElementModel[]] = ["",[]];

  // hara solicitud para 6, pero el sexto sera oculto, esto para confirmar si el numero de elementos es mayor a 5
  // 6 Fechas diferentes por pagina

  papu:HM_ElementModel[] = [
    {
      id_operacionProducto: 1,
      id_producto: 1,
      imagen: "https://www.fangamer.com/cdn/shop/products/product_DR_light_ralsei_plush_photo1.png?crop=center&height=1200&v=1691703459&width=1800",
      nombre: "Peluche de Ralsei sin Gorro",
      franquicia: "Deltarune",
      tipo_operacion: true,
      unidades: 2,
      modified_at:(new Date(2025,8,5,5,20)),
    }
  ]

  lisOfItems = [
    {
      fecha:"5 de Agosto del 2025",
      item: [
        {
          id_operacionProducto: 1,
          id_producto: 1,
          imagen: "https://www.fangamer.com/cdn/shop/products/product_DR_light_ralsei_plush_photo1.png?crop=center&height=1200&v=1691703459&width=1800",
          nombre: "Peluche de Ralsei sin Gorro",
          franquicia: "Deltarune",
          tipo_operacion: true,
          unidades: 2,
          modified_at:(new Date(2025,8,5,17,20)),
        },
        {
          id_operacionProducto: 2,
          id_producto: 2,
          imagen: "https://www.fangamer.com/cdn/shop/files/product_horse_ralsei_costume_staged1.png?crop=center&height=1200&v=1748912701&width=1800",
          nombre: "Peluche de Ralsei Caballo",
          franquicia: "Deltarune",
          tipo_operacion: false,
          unidades: 1,
          modified_at:(new Date(2025,8,5,17,10)),
        },
        {
          id_operacionProducto: 3,
          id_producto: 3,
          imagen: "https://i.pinimg.com/originals/04/16/90/041690d61094c6ba60bc00114815c02f.png",
          nombre: "Peluche de Ralsei con gorro",
          franquicia: "Deltarune",
          tipo_operacion: true,
          unidades: 1,
          modified_at:(new Date(2025,8,5,17,0)),
        },
        {
          id_operacionProducto: 3,
          id_producto: 4,
          imagen: "https://pbs.twimg.com/media/EDFzbagX4AMl7Lr.jpg",
          nombre: "Peluche de Asgore",
          franquicia: "Undertale",
          tipo_operacion: true,
          unidades: 1,
          modified_at:(new Date(2025,8,5,16,20)),
        },
        {
          id_operacionProducto: 3,
          id_producto: 5,
          imagen: "https://i.etsystatic.com/56977575/r/il/03a244/6587600546/il_fullxfull.6587600546_izel.jpg",
          nombre: "Peluche de Caballerito",
          franquicia: "Hollow Knight",
          tipo_operacion: true,
          unidades: 1,
          modified_at:(new Date(2025,8,5,15,30)),
        },
        {
          id_operacionProducto: 6,
          id_producto: 6,
          imagen: "https://images.steamusercontent.com/ugc/644376283703555454/EF56A30A0D9B9DF6D42B8D21145CFD96BB7A7C0E/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
          nombre: "WINDINGS GASTER",
          franquicia: "UT",
          tipo_operacion: true,
          unidades: 1,
          modified_at:(new Date(2025,8,5,6,16)),
        }
      ]
    },
    {
      fecha:"4 de Agosto del 2025",
      item: [
        {
          id_operacionProducto: 1,
          id_producto: 1,
          imagen: "https://www.fangamer.com/cdn/shop/products/product_DR_light_ralsei_plush_photo1.png?crop=center&height=1200&v=1691703459&width=1800",
          nombre: "Peluche de Ralsei sin Gorro",
          franquicia: "Deltarune",
          tipo_operacion: true,
          unidades: 2,
          modified_at:(new Date(2025,8,5,17,20)),
        },
        {
          id_operacionProducto: 2,
          id_producto: 2,
          imagen: "https://www.fangamer.com/cdn/shop/files/product_horse_ralsei_costume_staged1.png?crop=center&height=1200&v=1748912701&width=1800",
          nombre: "Peluche de Ralsei Caballo",
          franquicia: "Deltarune",
          tipo_operacion: false,
          unidades: 1,
          modified_at:(new Date(2025,8,5,17,10)),
        },
        {
          id_operacionProducto: 3,
          id_producto: 3,
          imagen: "https://i.pinimg.com/originals/04/16/90/041690d61094c6ba60bc00114815c02f.png",
          nombre: "Peluche de Ralsei con gorro",
          franquicia: "Deltarune",
          tipo_operacion: true,
          unidades: 1,
          modified_at:(new Date(2025,8,5,17,0)),
        },
        {
          id_operacionProducto: 3,
          id_producto: 4,
          imagen: "https://pbs.twimg.com/media/EDFzbagX4AMl7Lr.jpg",
          nombre: "Peluche de Asgore",
          franquicia: "Undertale",
          tipo_operacion: true,
          unidades: 1,
          modified_at:(new Date(2025,8,5,16,20)),
        },
        {
          id_operacionProducto: 3,
          id_producto: 5,
          imagen: "https://i.etsystatic.com/56977575/r/il/03a244/6587600546/il_fullxfull.6587600546_izel.jpg",
          nombre: "Peluche de Caballerito",
          franquicia: "Hollow Knight",
          tipo_operacion: true,
          unidades: 1,
          modified_at:(new Date(2025,8,5,15,30)),
        },
        {
          id_operacionProducto: 6,
          id_producto: 6,
          imagen: "https://images.steamusercontent.com/ugc/644376283703555454/EF56A30A0D9B9DF6D42B8D21145CFD96BB7A7C0E/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
          nombre: "WINDINGS GASTER",
          franquicia: "UT",
          tipo_operacion: true,
          unidades: 1,
          modified_at:(new Date(2025,8,5,6,16)),
        }
      ]
    },
    {
      fecha:"5 de Agosto del 2025",
      item: [
        {
          id_operacionProducto: 1,
          id_producto: 1,
          imagen: "https://www.fangamer.com/cdn/shop/products/product_DR_light_ralsei_plush_photo1.png?crop=center&height=1200&v=1691703459&width=1800",
          nombre: "Peluche de Ralsei sin Gorro",
          franquicia: "Deltarune",
          tipo_operacion: true,
          unidades: 2,
          modified_at:(new Date(2025,8,5,17,20)),
        },
        {
          id_operacionProducto: 2,
          id_producto: 2,
          imagen: "https://www.fangamer.com/cdn/shop/files/product_horse_ralsei_costume_staged1.png?crop=center&height=1200&v=1748912701&width=1800",
          nombre: "Peluche de Ralsei Caballo",
          franquicia: "Deltarune",
          tipo_operacion: false,
          unidades: 1,
          modified_at:(new Date(2025,8,5,17,10)),
        },
        {
          id_operacionProducto: 3,
          id_producto: 3,
          imagen: "https://i.pinimg.com/originals/04/16/90/041690d61094c6ba60bc00114815c02f.png",
          nombre: "Peluche de Ralsei con gorro",
          franquicia: "Deltarune",
          tipo_operacion: true,
          unidades: 1,
          modified_at:(new Date(2025,8,5,17,0)),
        },
        {
          id_operacionProducto: 3,
          id_producto: 4,
          imagen: "https://pbs.twimg.com/media/EDFzbagX4AMl7Lr.jpg",
          nombre: "Peluche de Asgore",
          franquicia: "Undertale",
          tipo_operacion: true,
          unidades: 1,
          modified_at:(new Date(2025,8,5,16,20)),
        },
        {
          id_operacionProducto: 3,
          id_producto: 5,
          imagen: "https://i.etsystatic.com/56977575/r/il/03a244/6587600546/il_fullxfull.6587600546_izel.jpg",
          nombre: "Peluche de Caballerito",
          franquicia: "Hollow Knight",
          tipo_operacion: true,
          unidades: 1,
          modified_at:(new Date(2025,8,5,15,30)),
        },
        {
          id_operacionProducto: 6,
          id_producto: 6,
          imagen: "https://images.steamusercontent.com/ugc/644376283703555454/EF56A30A0D9B9DF6D42B8D21145CFD96BB7A7C0E/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
          nombre: "WINDINGS GASTER",
          franquicia: "UT",
          tipo_operacion: true,
          unidades: 1,
          modified_at:(new Date(2025,8,5,6,16)),
        }
      ]
    }
  ]

  getItems(){
    return this.lisOfItems;
  }

  private navControl = inject(NavController);

  constructor() {
    addIcons({searchOutline,caretDownOutline})
   }

  ngOnInit() {
  }



  searchByDate(date:string){
    this.navControl.navigateForward("/tabs/historial-movimientos/byDate/"+date);
  }

}
