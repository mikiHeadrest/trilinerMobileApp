import { ChangeDetectorRef, Component, computed, effect, inject, NgModule, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonInput, IonTitle, IonToolbar, NavController } from '@ionic/angular/standalone';
import { HMMovimientosDiaComponent } from '../../components/hm-movimientos-dia/hm-movimientos-dia.component';
import { addIcons } from 'ionicons';
import { arrowBack, caretDownOutline, searchOutline } from 'ionicons/icons';
import { HM_ElementModel } from 'src/app/models/hm_ElementModel.models';
import { elementAt } from 'rxjs';


@Component({
  selector: 'app-hm-main-page',
  templateUrl: './hm-main-page.page.html',
  styleUrls: ['./hm-main-page.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HMMovimientosDiaComponent, IonContent, IonHeader, IonInput, IonIcon,FormsModule, ]
})
export class HMMainPagePage implements OnInit {

  searchInput = signal("");
  itemsPorPagina = 5;
  currentPage= 1;
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
    },
    {
      fecha:"2 de Agosto del 2025",
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
        }
      ]
    },
    {
      fecha:"1 de Agosto del 2025",
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
        }
      ]
    },
    {
      fecha:"31 de Julio del 2025",
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
        }
      ]
    }
    // ELIMINAR AQUI
  ]

  private navControl = inject(NavController);

  constructor(private changeDetector: ChangeDetectorRef) {
    addIcons({searchOutline,caretDownOutline, arrowBack});
  }

  ngOnInit() {
  }

  filteredItems = computed(()=>{
    const cleanInput = this.searchInput().trim().toLowerCase();

    if(!cleanInput) return this.getItems();

    // .map - es similar a un for each lo que hace es pasara cada uno de los elementos registrados
    // dentro del arreglo a una funcion
    // y como resultado genera un nuevo arreglo
    console.log("raw: "+this.searchInput());
    console.log("Clean: "+cleanInput)

    let listOfFilteredItems= this.getItems().map((item)=>{
      const filtered = item.item.filter(element => {
          return element.id_producto.toString().toLowerCase().includes(cleanInput) ||
          element.nombre.toLowerCase().includes(cleanInput) ||
          element.franquicia.toLowerCase().includes(cleanInput)
        }
      )
      // element.id_producto.toString().toLowerCase().incluedes(cleanInput)
      // son comprobocaciones que dan valores true or false, los elementos se filtran si el valor retorando por
      // elemento es verdadero o falso :3

      return{
        fecha: item.fecha,
        item: filtered
      }

    }).filter(element => { return (element.item.length > 0)} )

    console.log("Filtro:" + JSON.stringify(listOfFilteredItems))
    // -- ^TESTEO
    const itemsToReturn = listOfFilteredItems.map((item)=>{

    })


    return listOfFilteredItems;
    // Por ultimo se filtran los datos por la cantidad de elementos que elementos que hay, para no mostrar fechas
    // que no tienen nada registrado
  })

  getItems(){
    return this.listOfItems;
  }

  searchByDate(date:string){
    this.navControl.navigateForward("/tabs/historial-movimientos/byDate/"+date);
  }

  getTotalPages(){
    return Math.ceil(this.filteredItems().length / this.itemsPorPagina)
  }

  getPaginatedItems(){
    const start = (this.currentPage-1) * this.itemsPorPagina
    return this.filteredItems().slice(start, start + this.itemsPorPagina);
  }

  getVisiblePages = computed(()=>{

    const totalPage:number = this.getTotalPages()!;
    const currentPage = this.currentPage;

    console.log(currentPage)

    const pages: (number|string)[] = []

    //casos que manejen un numero de paginas mayor a 7
    if(totalPage >= 7){

      // Pagina actual alejada por mas de 7 pagina de la ultima pagina
      if((totalPage-currentPage )> 7){
      // Significa que se debe ver [...] a la derecha (al final)
        for(let i=currentPage; i<currentPage+7;i++){
          if(i != (currentPage+6)){
            pages.push(i+1);
          } else{
            pages.push('...');
          }
        }

      }
      else if((totalPage - currentPage )< 7){
        //Pagina actual cerca de las ultimas paginas
        // Dentro del rango de pagina totalPage esta muy cercano
        // (6 cantidades)
        const firstValueOnList = totalPage-7;
        for(let i = firstValueOnList; i<totalPage;i++){
          if(i!=firstValueOnList){
            pages.push('...')
          }
          else{
            pages.push(i+1)
          }
        }

      }
    }
    else{
      for(let i=0; i<totalPage;i++){
        pages.push(i+1)
      }
    }

    // HASTA EL FINAL DE TODO ESTO SE CAMBIA LA POSICION DE LA PAGINA A LA PRIMERA
    this.currentPage = 1
    // con esto cambia de posicion siempre al principio
    //Antes manejaba currentPage como signal, por si hay errores por eso

    return pages
  })

  // loadFirstPage(){
  //   this.currentPage.set(1)
  // }

  goToPage(page:number|string){
    if(typeof page == 'number') this.currentPage = (page);
  }

  previousPage(){
    if(this.currentPage > 1) this.currentPage = (this.currentPage - 1);
  }

  nextPage(){
    if(this.currentPage < this.getTotalPages()) this.currentPage = (this.currentPage+1);
  }
}
