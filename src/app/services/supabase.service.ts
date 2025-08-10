import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

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
}
