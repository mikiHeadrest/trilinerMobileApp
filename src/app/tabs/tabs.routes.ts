import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'main',
        loadComponent: () =>
          import('../ventana-prinicpal/ventana-prinicpal.page').then((m) => m.VentanaPrinicpalPage ),
      },
      {
        path: 'inventario',
        loadComponent: () => import('../ventana-inventario/ventana-inventario.page').then( m => m.VentanaInventarioPage)
      }
      ,
      {
        path: 'historial-movimientos',
        loadComponent: () => import('../ventana-historial-movimientos/ventana-historial-movimientos.page').then( m => m.VentanaHistorialMovimientosPage)
      },
      {
        path: 'monitoreo',
        loadComponent: () => import('../ventana-monitoreo/ventana-monitoreo.page').then( m => m.VentanaMonitoreoPage)
      },
      {
        path: 'config',
        loadComponent: () => import('../ventana-config/ventana-config.page').then( m => m.VentanaConfigPage)
      },
      {
        path: '',
        redirectTo: '/tabs/main',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/main',
    pathMatch: 'full',
  },
];
