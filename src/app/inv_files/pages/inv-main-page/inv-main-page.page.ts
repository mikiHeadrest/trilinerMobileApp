import { Component, computed, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController, ModalController, IonCard, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonThumbnail, IonTitle, IonToolbar, IonSpinner, IonText } from '@ionic/angular/standalone';

import { InvAsignarProductoComponent } from '../../components/inv-asignar-producto/inv-asignar-producto.component';

import { addIcons } from 'ionicons';
import { StylesServiceService } from 'src/app/services/styles-service.service';
import { SupabaseService } from 'src/app/services/supabase.service';
import { addCircle, folder } from 'ionicons/icons';

export interface Producto {
  id_producto: string;
  nombre: string;
  descripcion?: string;
  franquicia?: string;
  imagen?: string;
}

@Component({
  selector: 'app-inv-main-page',
  templateUrl: './inv-main-page.page.html',
  styleUrls: ['./inv-main-page.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,IonCard,IonItem,IonThumbnail,IonLabel,IonCardTitle,IonCardSubtitle, IonSpinner, IonText,
    CommonModule, FormsModule]
})
export class InvMainPagePage implements OnInit {

  productos: any[] = [];
  loading = true;
  error?: string;

  private stylesService = inject(StylesServiceService)
  private navControl = inject(NavController);

  search: string = '';
  page = 1;
  pageSize = 6;

  buttonIsEnabled = computed(() => this.stylesService.getInvAddButton());
  headerTitle = computed(() => this.stylesService.getHeaderTitle());

  constructor(private supa: SupabaseService, private modalCtrl: ModalController) {
    addIcons({ folder, addCircle });
  }

  async ngOnInit() {
    this.stylesService.setHeaderTitle?.('Inventario');
    await this.cargarProductos();
  }

  changePage() {
    this.navControl.navigateForward('/tabs/inventario/agregar-elemento');
  }

  async cargarProductos() {
    this.loading = true;
    this.error = undefined;

    const { data, error } = await this.supa.getProductos(100); // puedes ordenar en el servicio
    if (error) this.error = error.message;

    this.productos = data ?? [];
    this.page = 1; // al recargar/buscar, vuelve a la primera
    this.loading = false;
  }

  // filtros y paginacion
  get filtered() {
    const q = this.search.trim().toLowerCase();
    if (!q) return this.productos;
    return this.productos.filter(
      (p) =>
        (p.nombre ?? '').toLowerCase().includes(q) ||
        (p.franquicia ?? '').toLowerCase().includes(q) ||
        (p.descripcion ?? '').toLowerCase().includes(q)
    );
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.filtered.length / this.pageSize));
  }

  get pageItems() {
    const start = (this.page - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  gotoPage(p: number) {
    if (p >= 1 && p <= this.totalPages) this.page = p;
  }
  prev() {
    this.gotoPage(this.page - 1);
  }
  next() {
    this.gotoPage(this.page + 1);
  }
  async openModal(p: Producto) {
    const modal = await this.modalCtrl.create({
      component: InvAsignarProductoComponent,
      cssClass: 'modalOperacion',
      componentProps: { productoInicial: p }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

  }

}
