import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./shared/app.layout.component').then(m => m.AppLayoutComponent)
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
