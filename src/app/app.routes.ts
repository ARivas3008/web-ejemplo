/**
 * @summary app.routes.ts provides its documented Angular DDD responsibility.
 * @author Bernie Aarón Rivas Méndez
 */
import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'bookstores/overview' },
  {
    path: 'bookstores',
    loadChildren: () =>
      import('./bookstores/presentation/bookstores.routes').then((m) => m.bookstoreRoutes),
  },
  {
    path: 'inventory',
    loadChildren: () =>
      import('./inventory/presentation/inventory.routes').then((m) => m.inventoryRoutes),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/presentation/pages/page-not-found').then((m) => m.PageNotFound),
  },
];
