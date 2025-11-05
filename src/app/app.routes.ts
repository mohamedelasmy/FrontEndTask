import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/layout/app.layout.component').then(m => m.AppLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'zones',
        pathMatch: 'full'
      },
      {
        path: 'zones',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
