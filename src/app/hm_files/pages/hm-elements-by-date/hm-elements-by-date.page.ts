import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonInput, IonTitle, IonToolbar, NavController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack, arrowBackCircle, search, searchOutline } from 'ionicons/icons';
import { ActivatedRoute } from '@angular/router';
import { HMInfoElementoComponent } from '../../components/hm-info-elemento/hm-info-elemento.component';
import { HM_ElementModel } from 'src/app/models/hm_ElementModel.models';

@Component({
  selector: 'app-hm-elements-by-date',
  templateUrl: './hm-elements-by-date.page.html',
  styleUrls: ['./hm-elements-by-date.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, CommonModule, FormsModule, IonIcon, IonInput, HMInfoElementoComponent]
})
export class HMElementsByDatePage implements OnInit {
  private activateRoute = inject(ActivatedRoute);
  private navControl = inject(NavController);
  date:string="";

  searchInput = signal("");

  currentPage:number = 1;
  itemsPerPage:number = 7;


  listOfElements:HM_ElementModel[] = [
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
        },
        {
          id_operacionProducto: 7,
          id_producto: 7,
          imagen: "https://i.etsystatic.com/10959826/r/il/9513fb/1755054117/il_fullxfull.1755054117_3yf7.jpg",
          nombre: "Susie",
          franquicia: "Deltarune",
          tipo_operacion: false,
          unidades: 2,
          modified_at:(new Date(2025,8,5,6,16)),
        },
        {
          id_operacionProducto: 7,
          id_producto: 8,
          imagen: "https://i.etsystatic.com/20399325/r/il/93734c/7016610176/il_fullxfull.7016610176_qccc.jpg",
          nombre: "StarWalker",
          franquicia: "Deltarune",
          tipo_operacion: false,
          unidades: 2,
          modified_at:(new Date(2025,8,5,6,16)),
        }
      ]

  constructor() {
    addIcons({arrowBackCircle, searchOutline, arrowBack});
  }

  // Filtra los datos en base a la barra de busqueda
  filteredList = computed(()=>{

    const cleanInput = this.searchInput().trim().toLowerCase()

    if(!cleanInput) return this.getListOfElements()

    const filteredList = this.getListOfElements().filter(element =>{
      return element.id_producto.toString().toLowerCase().includes(cleanInput) ||
      element.franquicia.toLowerCase().includes(cleanInput) ||
      element.nombre.toLowerCase().includes(cleanInput)
    })

    // Cambia la pagina a la primera
    this.currentPage = 1;

    return filteredList;

  })

  getTotalPages(){
    return Math.ceil(this.filteredList().length / this.itemsPerPage)
  }

  // Filtra las paginas en base a la cantidad de elementos actual
  getVisiblePages = computed(()=>{
    const totalPages = this.getTotalPages();
    const currentPage = this.currentPage;

    let pages: (number | string)[] = []

    if(totalPages > 7){

      if((totalPages -currentPage)> 7 ){
        for(let i=currentPage; i<currentPage+7;i++){
          if(i != (currentPage+6)){
            pages.push(i+1);
          } else{
            pages.push('...');
          }
        }
      }
      else{
        let firstValueOnList = (totalPages - 7)

        for(let i = firstValueOnList; i<totalPages;i++){
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
      for(let i=0; i<totalPages; i++){
        pages.push(i+1);
      }
    }

    return pages;

  })

  getVisibleElements(){
    const start = (this.currentPage-1) * this.itemsPerPage
    return this.filteredList().slice(start,start+this.itemsPerPage);
  }

  getPreviousPage(){
    if(this.currentPage > 1) this.currentPage--
  }

  getNextPage(){
    if(this.currentPage < this.getTotalPages()) this.currentPage++
  }

  goToPage(data:(number|string)){
    if(typeof data == 'number') this.currentPage = data
  }

  getListOfElements(){
    return this.listOfElements
  }

  ngOnInit() {
    this.date = this.activateRoute.snapshot.paramMap.get('date') as string;
    // Hacer consulta en la base de datos que busce operaciones productos que tengan como parametro
    // created_at = date
    //!! Fecha de Creacion = fecha a Verificar
    // Primero contar el numero de elementos para hacer la paginacion

    //luego cargar elementos

  }

  volver(){
    console.log("hello?")
    this.navControl.back();
    this.navControl.pop();
  }
}
