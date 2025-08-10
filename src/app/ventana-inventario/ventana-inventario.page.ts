import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonText,
  IonButton,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonRouterOutlet,
  NavController,
  IonList,
} from '@ionic/angular/standalone';
import { addCircle, folder } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { StylesServiceService } from '../services/styles-service.service';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-ventana-inventario',
  templateUrl: './ventana-inventario.page.html',
  styleUrls: ['./ventana-inventario.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonIcon,
    IonSearchbar,
    IonText,
    IonSpinner,
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    IonThumbnail,
  ],
})
export class VentanaInventarioPage implements OnInit {
  productos: any[] = [];
  loading = true;
  error?: string;

  search = '';
  page = 1;
  pageSize = 6;

  private stylesService = inject(StylesServiceService);
  private navControl = inject(NavController);

  buttonIsEnabled = computed(() => this.stylesService.getInvAddButton());
  headerTitle = computed(() => this.stylesService.getHeaderTitle());

  constructor(private supa: SupabaseService) {
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
}
