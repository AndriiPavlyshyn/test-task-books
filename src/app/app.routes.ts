import { Routes } from '@angular/router'


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    data: {
      title: 'Books list',
    },
    loadComponent: () => import('./pages/home/home.page').then((m) => m.default),
  },
]
