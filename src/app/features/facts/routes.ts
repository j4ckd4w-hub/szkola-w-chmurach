import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'list'
  },
  {
    path: 'list', loadComponent: () => import('./pages/list/list.component').then(m => m.FactsListComponent)
  },
  {
    path: '**', redirectTo: 'login'
  }
]
