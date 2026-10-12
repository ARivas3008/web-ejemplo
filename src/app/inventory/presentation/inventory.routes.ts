/**
 * @summary inventory.routes.ts provides its documented Angular DDD responsibility.
 * @author Bernie Aarón Rivas Méndez
 */
import { Routes } from '@angular/router';
export const inventoryRoutes: Routes = [
  {
    path: 'receipts',
    children: [
      {
        path: 'new',
        loadComponent: () => import('./pages/receive-books').then((m) => m.ReceiveBooks),
      },
    ],
  },
];
