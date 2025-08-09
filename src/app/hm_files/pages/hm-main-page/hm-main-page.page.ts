import { ChangeDetectorRef, Component, inject, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
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
  imports: [IonContent, CommonModule, FormsModule, HMMovimientosDiaComponent, IonContent, IonHeader, IonInput, IonIcon,FormsModule, ]
})
export class HMMainPagePage implements OnInit {

  searchInput:string="";
  itemsPorPagina = 5;
  currentPage=1;
  // listOfItems:{fecha:string,item:HM_ElementModel[]}[] = []


  // hara solicitud para 6, pero el sexto sera oculto, esto para confirmar si el numero de elementos es mayor a 5
  // 6 Fechas diferentes por pagina

  listOfItems:{fecha:string,item:HM_ElementModel[]}[] = [
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
    // ELIMINAR DE AQUI
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
      fecha:"3 de Agosto del 2025",
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
    // ELIMINAR AQUI
  ]

  private navControl = inject(NavController);

  constructor(private changeDetector: ChangeDetectorRef) {
    addIcons({searchOutline,caretDownOutline})
  }

  ngOnInit() {
  }

  async show(){
    console.log("Info en search Inpunt:" + this.searchInput)
    console.log(this.searchInput);
    let newData = this.getFilteredItems();
    console.log("FILTERED:" + JSON.stringify(newData));
    // for(let i= 0;i < newData.length;i++){
    //   console.log("["+(i+1)+"] Longitud="+newData[i].item.length)
    //   console.log("JSON:" + JSON.stringify(newData[i].item));
    // }
  }

  getFilteredItems(){
    let cleanSearchInput = this.searchInput.trim().toLowerCase();
    if(!cleanSearchInput){
      console.log("No filtro nada")
      return this.listOfItems
    }
    else{
      console.log("no se..")
      let filteredItems: {fecha:string, item:HM_ElementModel[]}[] = [];

      let newEmptyArray: HM_ElementModel[] = [];
      this.listOfItems.forEach(item =>{
          newEmptyArray = item.item.filter(hm_element =>
          hm_element.id_producto.toString().includes(cleanSearchInput) ||
          hm_element.nombre.toLowerCase().includes(cleanSearchInput) ||
          hm_element.franquicia.toLowerCase().includes(cleanSearchInput)
          )
          if(newEmptyArray) filteredItems.push({fecha:item.fecha,item:newEmptyArray})
        }
      )
      newEmptyArray.forEach(element => {
        console.log("verifying each ELEMENT"+JSON.stringify(element))
      })

      return filteredItems;

      // return this.listOfItems.forEach(item => {
      //     item.item.filter(hm_element => {
      //     hm_element.id_producto.toString().includes(cleanSearchInput) ||
      //     hm_element.nombre.toLowerCase().includes(cleanSearchInput) ||
      //     hm_element.franquicia.toLowerCase().includes(cleanSearchInput)
      //   })
      // })
    }
  }

  getItems(){
    return this.listOfItems;
  }

  searchByDate(date:string){
    this.navControl.navigateForward("/tabs/historial-movimientos/byDate/"+date);
  }



}
