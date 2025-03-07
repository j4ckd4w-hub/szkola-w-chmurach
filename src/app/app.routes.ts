import { Routes } from '@angular/router';
import { appGuard, authGuard } from '@core/guards';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'facts' },
  {
    path: 'facts',
    canActivate: [authGuard],
    loadChildren: () => import('./features/facts/routes').then(m => m.routes)
  },
  {
    path: 'auth', canActivate: [appGuard], loadChildren: () => import('./features/auth/routes').then(m => m.routes)
  },
  {
    path: '**', redirectTo: 'login'
  }
];
