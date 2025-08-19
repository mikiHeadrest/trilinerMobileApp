import { Component, effect, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { duplicate } from 'ionicons/icons';
import { NavController } from '@ionic/angular';
import { OperacionService } from 'src/app/services/operacion.service';
import { SupabaseService } from 'src/app/services/supabase.service';
import { createClient } from '@supabase/supabase-js';
import { SppService } from '../../../services/spp.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registro-operacion',
  templateUrl: './registro-operacion.page.html',
  styleUrls: ['./registro-operacion.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton,
    CommonModule, FormsModule
  ]
})
export class RegistroOperacionPage implements OnInit, OnDestroy {
  // UI / estado
  encendido = false;
  tipoSelect: string = 'recepcion';
  tipo = true; // true = recepción
  nombre = '';
  descripcion = '';
  ubi = '';                        // (si no lo usas, puedes quitarlo)
  ubicacion: string = 'a';         // a..h para el slot
  botonBloqueado = false;

  // inyección
  private navControl = inject(NavController);
  private supabaseService = inject(SupabaseService);
  public  operacionService = inject(OperacionService);
  constructor(public spp: SppService) {
    addIcons({ duplicate });
    effect(() => {
      const seleccion = this.operacionService.productos();
      const ids = [...new Set(seleccion.map(p => p.idProducto))];
      this.cargar(ids, seleccion);
    });
  }

  // rx
  private sub?: Subscription;
  private actualizando = false;

  // ids y tracking
  ultimoIdOperacion?: number;                // id_operacionInventario
  private idsLineasUltimaOperacion: number[] = []; // todos los id_operacionProducto insertados
  private ultimoIdOperacionProducto?: number;      // último id_operacionProducto

  // productos
  producto: any[] = [];
  cargando = false;
  errorMsg: string | null = null;

  listaProductos: any[] = [];
  ids: string[] = [];

  private mapaUbiId: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8
  };

  private supabase = createClient(
    'https://xfkavfcpkvwfwwvegwep.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhma2F2ZmNwa3Z3Znd3dmVnd2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MzQ4MjAsImV4cCI6MjA2OTUxMDgyMH0.NrwMwj5uzSJDhFYkeUZNCFWutWd7e7Orqqx4mhLXOUA'
  );

  async ngOnInit() {
    // Escucha lo que manda el ESP32
    this.sub = this.spp.rxStream.subscribe(async (line) => {

      // ------- EVENTO: PRODUCTO:DEJADO -------
      if (line === 'PRODUCTO:DEJADO') {
        console.log('✅ Producto recibido');

        // Opción A: actualizar SOLO la última línea
        if (this.ultimoIdOperacionProducto) {
          if (this.actualizando) return;
          this.actualizando = true;
          try {
            const { data, error } = await this.supabase
              .from('operacion_producto')
              .update({
                isAllocated: true,
                modified_at: new Date().toISOString(), // opcional
              })
              .eq('id_operacionProducto', this.ultimoIdOperacionProducto)
              .select('id_operacionProducto, isAllocated')
              .single();

            if (error) {
              console.error('❌ Update error:', error);
            } else if (!data) {
              console.warn('⚠️ Update no devolvió filas (posible RLS o id inexistente)');
            } else {
              console.log('🔄 Línea actualizada:', data.id_operacionProducto, 'isAllocated=', data.isAllocated);
            }
          } catch (e) {
            console.error('❌ Excepción en update:', e);
          } finally {
            this.actualizando = false;
          }
          return; // evita caer a la opción B
        }

        // Opción B: actualizar TODAS las líneas guardadas
        if (this.idsLineasUltimaOperacion?.length) {
          if (this.actualizando) return;
          this.actualizando = true;
          try {
            const { data, error } = await this.supabase
              .from('operacion_producto')
              .update({
                isAllocated: true,
                modified_at: new Date().toISOString(), // opcional
              })
              .in('id_operacionProducto', this.idsLineasUltimaOperacion)
              .select('id_operacionProducto, isAllocated');

            if (error) {
              console.error('❌ Update error:', error);
            } else {
              console.log('🔄 Líneas actualizadas:', data?.map(d => ({
                id: d.id_operacionProducto,
                isAllocated: d.isAllocated
              })));
            }
          } catch (e) {
            console.error('❌ Excepción en update:', e);
          } finally {
            this.actualizando = false;
          }
        } else {
          console.warn('⚠️ No hay líneas de operación para actualizar');
        }
      }

      // ------- EVENTO: POS:... -------
      if (line.startsWith('POS:')) {
        const pos = line.replace('POS:', '');
        console.log('📍 Nueva posición', pos);
      }

      // ------- EVENTO: JOB:DONE -------
      if (line === 'JOB:DONE') {
        console.log('✔️ Trabajo finalizado, regresando a Home');
        this.botonBloqueado = false;
      }

    }); // <- cierra subscribe
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  private async cargar(
    ids: string[],
    seleccion: { idProducto: string; cantidad: number }[]
  ) {
    this.cargando = true;
    this.errorMsg = null;

    try {
      if (ids.length === 0) {
        this.producto = [];
        return;
      }
      const { data, error } = await this.supabaseService.getProductosByIds(ids);
      if (error) throw error;

      this.producto = (data ?? []).map(prod => {
        const qty = seleccion.find(s => s.idProducto === prod.id_producto)?.cantidad ?? 0;
        return { ...prod, cantidad: qty };
      });

      console.log('Productos con info:', this.producto);
    } catch (e: any) {
      this.errorMsg = e?.message ?? 'Error al cargar productos';
      this.producto = [];
      console.error(this.errorMsg);
    } finally {
      this.cargando = false;
    }
  }

  async operacion() {
    try {
      this.tipo = this.tipoSelect === 'recepcion';
      const tipoBool = this.tipo === true;

      const idInventario = this.mapaUbiId[this.ubicacion] ?? null;

      const payloadHeader = {
        tipo_operacion: tipoBool,
        estado: true,
        id_inventario: idInventario,
        nombre: this.nombre?.trim() || null,
        descripcion: this.descripcion?.trim() || null
      };

      const { data: header, error: errHeader } = await this.supabase
        .from('operacion_inventario')
        .insert([payloadHeader])
        .select('id_operacionInventario')
        .single();

      if (errHeader) throw errHeader;

      const idOperacion = header.id_operacionInventario;
      this.ultimoIdOperacion = idOperacion;
      console.log('Operación creada con ID:', idOperacion);

      const lineas = (this.producto || [])
        .filter((item: any) => item?.id_producto && item?.cantidad > 0)
        .map((item: any) => ({
          id_producto: item.id_producto,
          unidades: item.cantidad,
          id_maquina: 1,
          id_operacionInventario: idOperacion,
          isAllocated: false
        }));

      if (!lineas.length) {
        console.warn('No hay productos para insertar en operacion_producto');
        return;
      }

      const { data: detalles, error: errLineas } = await this.supabase
        .from('operacion_producto')
        .insert(lineas)
        .select('id_operacionProducto, id_producto, unidades, id_maquina');

      if (errLineas) throw errLineas;

      console.log('Líneas agregadas:', detalles);

      this.idsLineasUltimaOperacion = (detalles ?? []).map((d: any) => d.id_operacionProducto);
      this.ultimoIdOperacionProducto = this.idsLineasUltimaOperacion.at(-1);

      this.producto = [{}];
    } catch (e) {
      console.error('Error al crear la operación con líneas:', e);
    }
  }

  async pruebaLed() {
    this.botonBloqueado = true;
    await this.operacion();
    await this.spp.moveToSlot(this.ubicacion);
  }

  // navegación
  volver() { this.navControl.back(); }
  agregarProductos() { this.navControl.navigateForward('/tabs/inventario/'); }
}
