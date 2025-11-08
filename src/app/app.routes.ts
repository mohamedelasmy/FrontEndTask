import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/layout/layout').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'zones',
        pathMatch: 'full'
      },
      {
        path: 'zones',
        loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
