import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./item-detail/item-detail').then((m) => m.ItemDetail),
  },
];
