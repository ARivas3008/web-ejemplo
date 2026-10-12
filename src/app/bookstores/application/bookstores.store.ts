/**
 * @summary Provides the store catalog used by overview and receipt use cases.
 * @author Bernie Aarón Rivas Méndez
 */
import { Injectable, inject, signal } from '@angular/core';
import { BookstoresApi } from '../infrastructure/services/bookstores-api';
import { Bookstore } from '../domain/model/bookstore.entity';
@Injectable({ providedIn: 'root' })
/** Provides the store catalog used by overview and receipt use cases. */
export class BookstoresStore {
  private readonly api = inject(BookstoresApi);
  readonly stores = signal<Bookstore[]>([]);
  async load(): Promise<void> {
    this.stores.set(await this.api.getBookstores());
  }
  forSpecialty(specialty: string): Bookstore | undefined {
    const stores = this.stores().filter((s) => s.specialty === specialty);
    return stores.length === 1 ? stores[0] : undefined;
  }
}
