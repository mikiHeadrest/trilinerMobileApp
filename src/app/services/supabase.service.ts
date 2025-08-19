import { Injectable, signal, WritableSignal } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Timestamp } from 'rxjs';
import { HM_ElementModel } from '../models/hm_ElementModel.models';

export interface ProductoDB {
  id_producto: string;
  nombre: string;
  imagen?: string | null;
  descripcion?: string | null;
  franquicia?: string | null;
  created_at?: Date | null;
}

export interface monitoreoElement {
  id_operacionIventario: number,
  estado: boolean,
  id_operacionProducto: number,
  unidades:number,
  modified_at:Date,
  id_producto:number,
  nombre:string,
  imagen:string,
  franquicia:string,
  isAllocated:boolean,
  tipo_operacion:boolean
}

export interface monitoreoLatestElement{
  estado:boolean,
  tipo_operacion: boolean,
  id_operacioninventario: number,
  isallocated:boolean,
  unidades:number,
  id_producto: number,
  imagen:string,
}

export interface mainElement{
  tipo_operacion:boolean,
  id_producto:number,
  modified_at?:Date,
  unidades:number,
  nombre:string,
  franquicia:string,
  imagen:string,

  // true: Despacho
  //false: Recepcion
}

export interface mainQueries{
  id_producto: number,
  imagen: string,
  nombre: string,
  franquicia:string,
  totalunidades:number
}

export interface mainMostMovementQuery{
  fecha:Date,
  totaldemovimientos:number,
  totalrecepcion:number,
  totaldespacho:number
}

export interface mainTodaysMovementsQuery{
  fecha:Date,
  totalrecepcion:number,
  totaldespacho:number
}

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private listOfItems:WritableSignal<{fecha:string,item:HM_ElementModel[]}[]> = signal<{fecha:string,item:HM_ElementModel[]}[]>([]);
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  // Productos (lee 20)
  getProductos(limit = 20) {
    return this.client
      .from('producto')
      .select('id_producto, nombre, imagen, descripcion, franquicia')
      .limit(limit);
  }

  // IDs por nombre (útil para crear operaciones)
  async getIds(
    nInv = environment.inventarioNombre,
    nMaq = environment.maquinaNombre
  ) {
    const inv = await this.client
      .from('inventario')
      .select('id_inventario')
      .eq('nombre', nInv)
      .single();
    const maq = await this.client
      .from('maquina')
      .select('id_maquina')
      .eq('nombre_maquina', nMaq)
      .single();
    return { inv, maq };
  }

  getProductoById(id: string) {
    return this.client
      .from('producto')
      .select('id_producto, nombre, imagen, descripcion, franquicia')
      .eq('id_producto', id)
      .single()
      .returns<ProductoDB>();
  }

  getProductosByIds(ids: string[]) {
    if (!ids?.length) {
      return Promise.resolve({
        data: [] as ProductoDB[],
        error: null,
        count: null,
        status: 200,
        statusText: 'OK'
      });
    }

    return this.client
      .from('producto')
      .select('id_producto, nombre, imagen, descripcion, franquicia')
      .in('id_producto', ids)
      .returns<ProductoDB[]>();
  }

  async insertProducto(producto:ProductoDB){

    const {data, error} = await this.client
    .from('producto')
    .insert({
      id_producto: producto.id_producto,
      nombre: producto.nombre,
      imagen: producto.imagen,
      descripcion: producto.descripcion,
      franquicia:producto.franquicia
    });

    if(error){
      console.error("Error al realizar insercion: "+error)
    }
    else{
      console.log("Supabase!")
    }
    // if(producto.nombre == "" || producto.id_producto){
    //   return this.client.
    // }
  }

  async calculateLastRegisteredId(){
    const { data, error } = await this.client
    .from('producto')
    .select("id_producto")
    .order('created_at',{ ascending:false })
    .limit(1)

    if(error){
      console.error("Error al realizar la busqueda del ultimo prodcuto registrado " + error)
    }
    else if(data){
      const lastNum:number = await data[0].id_producto;
      return lastNum
    }
    return 0;
  }

  // tipo_operacion - tabla operacion_inventario
  // id_operacionProcuto, unidades- tabla operacion_producto
  // id_producto,nombre,imagen,franquicia - tabla: inventario

  // sort by modifiedt_at -


  async historialMovsElements():Promise<{fecha:string,item:HM_ElementModel[]}[]>{
    const {data,error} = await this.client
    .rpc('gethistorialmovs')


    if(error){
      console.error("Error al obtener el historalMovs " + JSON.stringify(error))
    }
    else{
      console.log("Se pasaron los datos de forma correcta!")
      this.listOfItems = data;
    }
    return data

  }

  async gethistoralMovsElements(){
    await this.historialMovsElements()
    return this.listOfItems();
  }

  async getMostRecentOperations():Promise<monitoreoElement[]>{
    const {data,error} = await this.client
    .rpc("getrecentoperations");

    if(error){
      console.log("error al realizar la insercion")
    }
    else {
      console.log("Datos obtenidos:"+JSON.stringify(data));
    }
    return data;
  }

  async getTotalOperaciones(tipo: boolean) {
    const { data, error } = await this.client.rpc('total_operaciones_por_tipo', { tipo });
    if (error) throw error;
    console.log(data);
    return data; // data será el número
  }

  // obtiene el primer elemento de la fila
  // o el ultimo elemento acomodad recepcion/despacho
  async getLatestProductoOperation():Promise<monitoreoLatestElement>{
    const {data,error} = await this.client
    .rpc('getlatestproductoperation').single();
    if(error){
      console.error("error al obtener el ultimo producto:" +error )
      throw error
    }
    // console.log("Data"+ JSON.stringify(data)) prueba-- eliminar
    return data as monitoreoLatestElement;
  }

  async getMainRecentElements():Promise<mainElement[]>{
    const {data,error} = await this.client
    .rpc('getmainrecentelements')

    console.log(JSON.stringify(data))
    if(error){
      console.error("Error en el main Elements: "+error)
    }
    return data;

  }

  async getProductoMostStored():Promise<mainQueries>{
    const {data,error} = await this.client
    .rpc('getproductomoststored')
    .single()

    if(error){
      console.error("Most Stored Error: "+error)
      throw error
    }

    console.log(JSON.stringify(data))
    return data as mainQueries
  }

  // no se decir despachos en ingles - deliveries :3
  async getMostDeliveries():Promise<mainQueries>{
    const {data,error} = await this.client
    .rpc('getproductomostdeliveries')
    .single()

    if(error){
      console.error("mostDeliveries error: " +error)
      throw error
    }

    return data as mainQueries
  }

  // se calcula de la suma de todas las unidades, y estos se agrupan por fechas
  // por si se preguntan por que el numero alto, es por los altos numeros
  // en la base de datos
  async getMostMovement():Promise<mainMostMovementQuery>{
    const {data,error} = await this.client
    .rpc('getdatemostoperations')
    .single()

    if(error){
      console.error("MostMovmentMain error: " + error)
    }

    return data as mainMostMovementQuery
  }

  async getTodaysOperations():Promise<mainTodaysMovementsQuery>{
    const {data,error} = await this.client
    .rpc('gettodaysoperations')
    .single()

    if(error){
      console.error("Error operaciones Hoy:"+error)
    }
    console.log(JSON.stringify(data))
    return data as mainTodaysMovementsQuery
  }

  async getElementsByDate(fecha:string):Promise<HM_ElementModel[]>{
    const {data,error} = await this.client
    .rpc('getallelementsbydate',{fecha})

    if(error){
      console.error("ElementsByDate error:" + error)
      throw error
    }

    return data;
  }

}
