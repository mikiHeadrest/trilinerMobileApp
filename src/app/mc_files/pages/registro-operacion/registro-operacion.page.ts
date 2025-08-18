import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { duplicate } from 'ionicons/icons';
import { NavController } from '@ionic/angular';
import { OperacionService } from 'src/app/services/operacion.service';
import { SupabaseService } from 'src/app/services/supabase.service';
import { createClient } from '@supabase/supabase-js';
import { SppService } from '../../../services/spp.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-registro-operacion',
  templateUrl: './registro-operacion.page.html',
  styleUrls: ['./registro-operacion.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton,
    CommonModule, FormsModule]
})
export class RegistroOperacionPage implements OnInit {
  //Recepcion = true y Despacho = false
  encendido: boolean = false;
  tipo: boolean = true; 
  nombre: string = '';
  descripcion: string = '';
  ubi: string = '';
  idInventario?: number;
  ubicacion: string = '';
  private navControl = inject(NavController);
  private supabaseService = inject(SupabaseService);
  public operacionService = inject(OperacionService);


  producto: any[] = [];
  cargando = false;
  errorMsg: string | null = null;

  listaProductos: any[] = [];
  ids: string[] = [];

  private mapaUbiId: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8
  };

  
  constructor(public spp: SppService) { 
    addIcons({duplicate});
      effect(() => {
      const seleccion = this.operacionService.productos();
      const ids = [...new Set(seleccion.map(p => p.idProducto))];
      this.cargar(ids, seleccion);
    });
  }

  async ngOnInit() {

  }

  private supabase = createClient(
    'https://xfkavfcpkvwfwwvegwep.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhma2F2ZmNwa3Z3Znd3dmVnd2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MzQ4MjAsImV4cCI6MjA2OTUxMDgyMH0.NrwMwj5uzSJDhFYkeUZNCFWutWd7e7Orqqx4mhLXOUA'
  );

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

 //INSERCION DE UNA OPERACION
  async operacion(){
    try {
      const tipoBool = this.tipo === true;
      const idInventario = this.mapaUbiId[this.ubi] ?? null;

      const payloadHeader = {
        tipo_operacion: tipoBool,
        estado: false,
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
      console.log('Operación creada con ID:', idOperacion);
      const lineas = (this.producto || []).map((item: any) => ({
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
      this.producto = [{}];

    } catch (e) {
      console.error('Error al crear la operación con líneas:', e);
    }
  }

  async pruebaLed() {
    await this.spp.moveToSlot(this.ubicacion);
    const slot = this.spp.currentSlot();
    console.log('Ubicación conocida:', slot ?? '(desconocida)');
    console.log("Z: "+this.estadoZ);
    console.log("X: "+this.estadoX);
    console.log("IR: "+this.estadoIR);
    console.log("GRIP: "+this.estadoPinza);
  }

  estadoZ   = this.spp.posZ();    // número
  estadoX   = this.spp.posX();    // número
  estadoIR  = this.spp.ir();      // {Z,X,GRIP}
  estadoPinza = this.spp.grip();  // 'OPEN'|'CLOSED'|'MOV'

//BOTON PARA VOLVER
  volver(){
    this.navControl.back();
  }

  agregarProductos(){
    this.navControl.navigateForward("/tabs/inventario/");
  }

}
