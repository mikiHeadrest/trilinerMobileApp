import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cog, desktop, home, folder, time } from 'ionicons/icons';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.page.html',
  styleUrls: ['./test-page.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonIcon,
    IonAvatar,
    IonFooter,
  ],
})
export class TestPagePage implements OnInit {
  productos: any[] = [];
  loading = true;
  error?: string;

  constructor(private supa: SupabaseService) {
    addIcons({ cog, desktop, home, folder, time });
  }

  async ngOnInit() {
    await this.cargarProductos();
  }

  async cargarProductos() {
    this.loading = true;
    this.error = undefined;
    const { data, error } = await this.supa.getProductos(20);
    if (error) this.error = error.message;
    this.productos = data ?? [];
    this.loading = false;
  }
}
