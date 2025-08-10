import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonThumbnail, IonTitle, IonToolbar, NavController, ModalController } from '@ionic/angular/standalone';

import { InvAsignarProductoComponent } from '../../components/inv-asignar-producto/inv-asignar-producto.component';

import { addIcons } from 'ionicons';
import { StylesServiceService } from 'src/app/services/styles-service.service';

@Component({
  selector: 'app-inv-main-page',
  templateUrl: './inv-main-page.page.html',
  styleUrls: ['./inv-main-page.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar,IonCard,IonItem,IonThumbnail,IonLabel,IonCardTitle,IonCardSubtitle, CommonModule, FormsModule]
})
export class InvMainPagePage implements OnInit {

  private stylesService = inject(StylesServiceService)
  private navControl = inject(NavController);

  searchTerm: string = '';

  constructor(private modalCtrl: ModalController) {
    this.stylesService.setHeaderTitle("Inventario Main");
    this.stylesService.setInvAddButton(true);
  }

  ngOnInit() {
  }

  items = [
    {
      id: '000 000 001',
      nombre: 'Peluche Punpun Onodera - Oyasumi Punpun',
      unidades: 10,
      imagen: 'https://imgs.search.brave.com/_1ESXV2zrVdyNwY97nZVbzL1ldK8B0ghWdoatxbJFKE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmVi/YXlpbWcuY29tL2lt/YWdlcy9nL2w4TUFB/T1N3YkRWbjI3b0kv/cy1sNTAwLmpwZw'
    },
    {
      id: '000 000 002',
      nombre: 'Peluche Luffy - One Piece',
      unidades: 5,
      imagen: 'https://imgs.search.brave.com/42_zbp4NKDGLCilRR1WrtL5joxtuofOKOFon0ysIS5M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZXNv/dXJjZXMuc2VhcnMu/Y29tLm14L21lZGlv/cy1wbGF6YXZpcC9t/a3QvNjRiNDI5MmEx/MGVhMl9zLWwxNjAw/cG5nLmpwZz9zY2Fs/ZT01MDAmcWx0eT03/NQ'
    },
    {
      id: '000 000 003',
      nombre: 'Figura Guts - Berserk',
      unidades: 7,
      imagen: 'https://i.ebayimg.com/images/g/N8EAAOSwTh1jzpGH/s-l500.jpg'
    },
    {
      id: '000 000 004',
      nombre: 'Figura Levi Ackerman - Attack on Titan',
      unidades: 4,
      imagen: 'https://i.ebayimg.com/images/g/0RMAAOSwWxVgoaaN/s-l500.jpg'
    },
    {
      id: '000 000 005',
      nombre: 'Pelota Pikachu - Pokémon',
      unidades: 20,
      imagen: 'https://i.ebayimg.com/images/g/1QcAAOSwfuNloDJE/s-l500.jpg'
    },
    {
      id: '000 000 006',
      nombre: 'Peluche Doraemon',
      unidades: 6,
      imagen: 'https://i.ebayimg.com/images/g/x5YAAOSwEV5lXNQ4/s-l500.jpg'
    },
    {
      id: '000 000 007',
      nombre: 'Peluche Totoro - Studio Ghibli',
      unidades: 9,
      imagen: 'https://i.ebayimg.com/images/g/3uYAAOSwctJkGN7s/s-l500.jpg'
    },
    {
      id: '000 000 008',
      nombre: 'Figura Naruto Uzumaki',
      unidades: 3,
      imagen: 'https://i.ebayimg.com/images/g/H-gAAOSwX31kFLUj/s-l500.jpg'
    },
    {
      id: '000 000 009',
      nombre: 'Peluche Nezuko - Demon Slayer',
      unidades: 12,
      imagen: 'https://i.ebayimg.com/images/g/5iYAAOSw1jVkUyQd/s-l500.jpg'
    },
    {
      id: '000 000 010',
      nombre: 'Figura Light Yagami - Death Note',
      unidades: 8,
      imagen: 'https://i.ebayimg.com/images/g/hSoAAOSwhB9j5uvf/s-l500.jpg'
    },
    {
      id: '000 000 011',
      nombre: 'Figura Edward Elric - Fullmetal Alchemist',
      unidades: 2,
      imagen: 'https://i.ebayimg.com/images/g/BsUAAOSwtZlkFSLc/s-l500.jpg'
    }
  ];

  itemsPerPage = 6;
  currentPage = 1;

  //Busqueda
  get filteredItems() {
    if (!this.searchTerm.trim()) return this.items;
    return this.items.filter(item =>
      item.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  //Calcular el numero de paginas
  get totalPages() {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  get paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredItems.slice(start, start + this.itemsPerPage);
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
    this.currentPage = 1;
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

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: InvAsignarProductoComponent,
      cssClass: 'modalOperacion'
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

  }

}
