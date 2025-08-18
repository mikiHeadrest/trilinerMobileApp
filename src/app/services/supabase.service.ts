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
  isAllocated:boolean
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
}
