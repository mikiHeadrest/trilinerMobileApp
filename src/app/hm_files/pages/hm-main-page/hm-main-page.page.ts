import { ChangeDetectorRef, Component, computed, effect, inject, NgModule, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonInput, IonTitle, IonToolbar, LoadingController, NavController, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { HMMovimientosDiaComponent } from '../../components/hm-movimientos-dia/hm-movimientos-dia.component';
import { addIcons } from 'ionicons';
import { arrowBack, caretDownOutline, searchOutline } from 'ionicons/icons';
import { HM_ElementModel } from 'src/app/models/hm_ElementModel.models';
import { elementAt } from 'rxjs';
import { SupabaseService } from 'src/app/services/supabase.service';
import { RefresherCustomEvent } from '@ionic/core';


@Component({
  selector: 'app-hm-main-page',
  templateUrl: './hm-main-page.page.html',
  styleUrls: ['./hm-main-page.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HMMovimientosDiaComponent, IonContent, IonHeader, IonInput, IonIcon, IonRefresher, IonRefresherContent, FormsModule, ]
})
export class HMMainPagePage implements OnInit {

  searchInput = signal("");
  itemsPorPagina = 5;
  currentPage= 1;


  listOfItems!:{fecha:string,item:HM_ElementModel[]}[];

  // le quite lo de que era una signal por si da errores, obtiene su valor de la signal que esta declarada en supabase.service
  // listOfItems:WritableSignal<{fecha:string,item:HM_ElementModel[]}[]> = signal<{fecha:string,item:HM_ElementModel[]}[]>([]);
  // signalList | ^ codigo previo por si pasan cosas escabrosas - (AAAAAA)

  // hara solicitud para 6, pero el sexto sera oculto, esto para confirmar si el numero de elementos es mayor a 5
  // 6 Fechas diferentes por pagina

  private navControl = inject(NavController);

  constructor(private changeDetector: ChangeDetectorRef, private supabaseService : SupabaseService, private loadingCtrl:LoadingController) {
    addIcons({searchOutline,caretDownOutline, arrowBack});
  }

  async ngOnInit() {
    this.presentLoading('loadHistorialMovs',"Cargando el historial de movimientos")
    this.listOfItems = await this.supabaseService.historialMovsElements()
    // this.listOfItems.set(await this.supabaseService.historialMovsElements())
    // ^ signalList | modificacion por si ocupa ser list

    console.log("listOfitems: "+JSON.stringify(this.listOfItems))
    this.dismissLoader('loadHistorialMovs')

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
    // return this.listOfItems()
    // signalList | por si ocupa ser list
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

  goToPage(page:number|string){
    if(typeof page == 'number') this.currentPage = (page);
  }

  previousPage(){
    if(this.currentPage > 1) this.currentPage = (this.currentPage - 1);
  }

  nextPage(){
    if(this.currentPage < this.getTotalPages()) this.currentPage = (this.currentPage+1);
  }

  // Mensaje de Carga
  async presentLoading(loadingId:string, loadingMsg:string){
    const loading = await this.loadingCtrl.create({
      id:loadingId,
      message:loadingMsg,
      spinner:'bubbles'
    });

    return await loading.present();
  }

  async dismissLoader(loadingId:string){
    return await this.loadingCtrl.dismiss(null,'',loadingId).then(()=>{console.log('bye')});
  }

      handleRefresh(event: RefresherCustomEvent) {
      setTimeout(async () => {
        this.listOfItems = await this.supabaseService.historialMovsElements()
        event.target.complete();
      }, 2000);
    }
}
