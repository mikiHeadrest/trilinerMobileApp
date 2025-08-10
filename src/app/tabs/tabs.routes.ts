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
        loadComponent: () => import('../ventana-inventario/ventana-inventario.page').then( m => m.VentanaInventarioPage),
        children: [
          {
            path:'',
            loadComponent: () => import('../inv_files/pages/inv-main-page/inv-main-page.page').then(m =>m.InvMainPagePage),
          },
          {
            path: '**',
            redirectTo: '',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'historial-movimientos',
        loadComponent: () => import('../ventana-historial-movimientos/ventana-historial-movimientos.page').then( m => m.VentanaHistorialMovimientosPage),
        children: [
          {
            path: '',
            loadComponent: () => import('../hm_files/pages/hm-main-page/hm-main-page.page').then(m => m.HMMainPagePage)
          },
          {
            path: 'elemento/:id',
            loadComponent: ()=> import('../hm_files/pages/hm-element/hm-element.page').then(m=>m.HMElementPage)
          }
          ,
          {
            path: 'byDate/:date',
            loadComponent: () => import('../hm_files/pages/hm-elements-by-date/hm-elements-by-date.page').then( m => m.HMElementsByDatePage)
          },
          {
            path: '**',
            redirectTo: '',
            pathMatch: 'full'
          }
        ]
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
