import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonInput, IonTitle, IonToolbar, NavController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack, arrowBackCircle, closeCircleOutline, search, searchOutline, serverOutline } from 'ionicons/icons';
import { ActivatedRoute } from '@angular/router';
import { HMInfoElementoComponent } from '../../components/hm-info-elemento/hm-info-elemento.component';
import { HM_ElementModel } from 'src/app/models/hm_ElementModel.models';
import { SupabaseService } from 'src/app/services/supabase.service';

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
  private supaService = inject(SupabaseService)

  date:string="";
  currentDate:Date = new Date();

  searchInput = signal("");

  currentPage:number = 1;
  itemsPerPage:number = 7;

  listOfElements:WritableSignal<HM_ElementModel[]> = signal([]);

  constructor() {
    addIcons({arrowBackCircle, searchOutline, arrowBack,closeCircleOutline,serverOutline});
  }

  // Filtra los datos en base a la barra de busqueda
  filteredList = computed(()=>{

    const cleanInput = this.searchInput().trim().toLowerCase()

    if(!cleanInput) return this.listOfElements()

    const filteredList = this.listOfElements().filter(element =>{
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


  async ngOnInit() {
    this.date = this.activateRoute.snapshot.paramMap.get('date') as string;
    console.log("fecha:"+this.date)
    this.listOfElements.set(await this.supaService.getElementsByDate(this.date))

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
