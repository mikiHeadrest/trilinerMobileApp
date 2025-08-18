import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'test-page',
    loadComponent: () => import('./test-page/test-page.page').then( m => m.TestPagePage)
  },
  {
    path: 'conexion-bluetooth',
    loadComponent: () => import('./conexion-bluetooth/conexion-bluetooth.page').then( m => m.ConexionBluetoothPage)
  },

  // {
  //   path: '',
  //   redirectTo: 'test-page',
  //   pathMatch: 'full'
  // }

];
