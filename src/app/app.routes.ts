import { Routes } from '@angular/router';
import { welcomeGuard } from './guards/welcome-guard';

export const routes: Routes = [
  {
    path:'',
    loadComponent: () => import('./pages/welcome/welcome')
      .then(m => m.Welcome),
    canActivate: [welcomeGuard]
  },
  {
    path:'dashboard',
    loadComponent: () => import('./layouts/dashboard-layout/dashboard-layout')
      .then(m => m.DashboardLayout),
    
    children: [
      {
        path: '',
        redirectTo: 'clients',
        pathMatch: 'full'
      },
      {
        path: 'clients',
        loadComponent: () => import('./pages/client/client')
          .then(m => m.Client)
      }
    ]
  }
];
