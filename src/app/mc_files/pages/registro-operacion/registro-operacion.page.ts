import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { duplicate } from 'ionicons/icons';
import { NavController } from '@ionic/angular';
import { OperacionService } from 'src/app/services/operacion.service';
import { SupabaseService } from 'src/app/services/supabase.service';

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
  private navControl = inject(NavController);
  private supabaseService = inject(SupabaseService);
  public operacionService = inject(OperacionService);


  producto: any[] = [];
  cargando = false;
  errorMsg: string | null = null;

  listaProductos: any[] = [];
  ids: string[] = [];

  constructor() {
    addIcons({duplicate});
      effect(() => {
      const seleccion = this.operacionService.productos(); // [{ idProducto, cantidad }, ...]
      const ids = [...new Set(seleccion.map(p => p.idProducto))];
      this.cargar(ids, seleccion);
    });
  }

  async ngOnInit() {

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

      // Une detalles de Supabase + cantidad guardada
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

  volver(){
    this.navControl.back();
  }

}
