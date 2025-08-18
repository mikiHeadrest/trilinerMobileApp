import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { calendarOutline } from 'ionicons/icons';
import {
  IonAvatar,
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  IonIcon,
} from '@ionic/angular/standalone';
import { mainElement, mainMostMovementQuery, mainQueries, mainTodaysMovementsQuery, SupabaseService } from '../services/supabase.service';
import { SppService } from '../services/spp.service';

addIcons({
  'calendar-outline': calendarOutline,
});

interface Operacion {
  tipo: string;
  nombre: string;
  unidades: number;
  idMontacargas: string;
  origen: string;
  fecha: Date;
  img: string;
}

@Component({
  selector: 'app-ventana-prinicpal',
  templateUrl: './ventana-prinicpal.page.html',
  styleUrls: ['./ventana-prinicpal.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonTitle,
    IonContent,
    IonAvatar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonIcon,
  ],
})
export class VentanaPrinicpalPage implements OnInit {
  private supabaseService = inject(SupabaseService);
  private sppService = inject(SppService);


  imgNotFound:string = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
  mainRecentElements:WritableSignal<mainElement[]> = signal([]);

  todaysoperations:mainTodaysMovementsQuery = ({
    fecha:new Date(),
    totalrecepcion: 0,
    totaldespacho: 0
  })

  // los cargo con valores estaticos, pero despues los lleno con consultas de la DB
  mostDeliveries:mainQueries = ({
    id_producto:0,
    imagen:this.imgNotFound,
    nombre:"Loading",
    franquicia:"Loading",
    totalunidades: 0
  })
  mostStored:mainQueries = ({
    id_producto:0,
    imagen:this.imgNotFound,
    nombre:"Loading",
    franquicia:"Loading",
    totalunidades: 0
  })
  dateMostMovement:mainMostMovementQuery = ({
    fecha:new Date(), //le asigna por defecto la fecha de hoy
    totaldemovimientos: 0,
    totalrecepcion: 0,
    totaldespacho: 0
  })

  isMachineActive = computed(()=>{
    return this.sppService.connected()
  })

  estado: string = 'Cargando';
  fecha= new Date();
  recepcion: number = 0;
  despacho: number = 0;


  constructor() {}

  async ngOnInit() {
    this.recepcion = await this.supabaseService.getTotalOperaciones(true);
    this.despacho = await this.supabaseService.getTotalOperaciones(false);

    this.todaysoperations = await this.supabaseService.getTodaysOperations();
    console.log("todays" + this.todaysoperations.fecha)

    this.mostDeliveries = await this.supabaseService.getMostDeliveries();
    this.mostStored = await this.supabaseService.getProductoMostStored();
    this.dateMostMovement = await this.supabaseService.getMostMovement();

    this.currentStatus()

    this.mainRecentElements.set(await this.supabaseService.getMainRecentElements())
  }

  async currentStatus(){
    console.log("machineStatus"+ this.isMachineActive())
    if(this.isMachineActive()){
      this.estado = "En Operacion"
    }
    else{
      this.estado = "Desconectado..."
    }
  }
}
