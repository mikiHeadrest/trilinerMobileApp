import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'test-page',
    loadComponent: () => import('./test-page/test-page.page').then( m => m.TestPagePage)
  },  {
    path: 'mc-main-page',
    loadComponent: () => import('./mc_files/pages/mc-main-page/mc-main-page.page').then( m => m.McMainPagePage)
  },

  // {
  //   path: '',
  //   redirectTo: 'test-page',
  //   pathMatch: 'full'
  // }

];
