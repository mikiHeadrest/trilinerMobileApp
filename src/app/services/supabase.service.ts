import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export interface ProductoDB {
  id_producto: string;
  nombre: string;
  imagen?: string | null;
  descripcion?: string | null;
  franquicia?: string | null;
}

@Injectable({ providedIn: 'root' })
export class SupabaseService {
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

  // IDs por nombre
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
      .returns<ProductoDB>();  }

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
  
  async getTotalOperaciones(tipo: boolean) {
    const { data, error } = await this.client.rpc('total_operaciones_por_tipo', { tipo });
    if (error) throw error;
    console.log(data);
    return data; // data será el número
  }
}
