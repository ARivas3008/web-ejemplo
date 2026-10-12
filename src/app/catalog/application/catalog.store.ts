/**
 * @summary Ignores obsolete responses when the specialty changes rapidly.
 * @author Bernie Aarón Rivas Méndez
 */
import { Injectable, inject, signal } from '@angular/core';
import { Book } from '../domain/model/book.entity';
import { CatalogApi } from '../infrastructure/services/catalog-api';
@Injectable({ providedIn: 'root' })
/** Ignores obsolete responses when the specialty changes rapidly. */
export class CatalogStore {
  private readonly api = inject(CatalogApi);
  private request = 0;
  readonly books = signal<Book[]>([]);
  readonly busy = signal(false);
  readonly error = signal('');
  async load(specialty: string): Promise<void> {
    const request = ++this.request;
    this.books.set([]);
    this.error.set('');
    this.busy.set(!!specialty);
    if (!specialty) return;
    try {
      const books = await this.api.books(specialty);
      if (request === this.request) this.books.set(books);
    } catch {
      if (request === this.request) this.error.set('api-error');
    } finally {
      if (request === this.request) this.busy.set(false);
    }
  }
}
