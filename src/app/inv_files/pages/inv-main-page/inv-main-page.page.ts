import { Component, computed, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController, ModalController, IonCard, IonCardSubtitle, IonCardTitle, IonContent,IonThumbnail, IonSpinner, IonText } from '@ionic/angular/standalone';

import { InvAsignarProductoComponent } from '../../components/inv-asignar-producto/inv-asignar-producto.component';

import { addIcons } from 'ionicons';
import { StylesServiceService } from 'src/app/services/styles-service.service';
import { HeaderComponent } from "src/app/inv_files/components/header/header.component";

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
    IonContent,  IonCard, IonThumbnail, IonCardTitle, IonCardSubtitle, IonSpinner, IonText,
    CommonModule, FormsModule,
    HeaderComponent
]
})
export class InvMainPagePage implements OnInit {

  productos: any[] = [];
  loading = true;
  error?: string;

  private stylesService = inject(StylesServiceService)
  private navControl = inject(NavController);

  search: string = '';
  currentPage = 1;
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
    this.currentPage = 1; // al recargar/buscar, vuelve a la primera
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
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }


  // Genera paginación dinámicamente
  get visiblePages(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const pages: (number | string)[] = [];

    if (total <= 7) {
      // Si hay 7 o menos páginas, se muestran todas
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 4) {
        pages.push(...[1, 2, 3, 4, 5, '...', total]);
      } else if (current >= total - 3) {
        pages.push(1, '...');
        for (let i = total - 4; i <= total; i++) pages.push(i);
      } else {
        pages.push(1, '...', current - 1, current, current + 1, '...', total);
      }
    }

    return pages;
  }

  goToPage(page: number | string) {
    if (typeof page === 'number') {
      this.currentPage = page;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
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

  mainPageFunction(){
    console.log("HOLA");
    this.navControl.navigateForward("/tabs/inventario/agregar-elemento")
  }

}
