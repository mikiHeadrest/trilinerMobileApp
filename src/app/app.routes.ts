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
    path:'**',
    redirectTo: '',
    pathMatch: 'full'
  }


  // {
  //   path: '',
  //   redirectTo: 'test-page',
  //   pathMatch: 'full'
  // }

];
