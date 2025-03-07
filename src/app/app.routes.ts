import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', loadChildren: () => import('./features/auth/routes').then(m => m.routes) },
  {
    path: 'auth', loadChildren: () => import('./features/auth/routes').then(m => m.routes)
  }
];
