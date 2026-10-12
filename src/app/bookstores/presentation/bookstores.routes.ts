/**
 * @summary bookstores.routes.ts provides its documented Angular DDD responsibility.
 * @author Bernie Aarón Rivas Méndez
 */
import { Routes } from '@angular/router';
export const bookstoreRoutes: Routes = [
  {
    path: 'overview',
    loadComponent: () => import('./pages/bookstore-overview').then((m) => m.BookstoreOverview),
  },
];
