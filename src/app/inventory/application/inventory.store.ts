/**
 * @summary Coordinates receipt validation, persistence, and reactive inventory state.
 * @author Bernie Aarón Rivas Méndez
 */
import { Injectable, inject, signal } from '@angular/core';
import { InventoryApi } from '../infrastructure/services/inventory-api';
import { BookStock } from '../domain/model/book-stock.entity';
import { ReceiveBooksCommand } from '../domain/model/receive-books.command';
import { BookstoresStore } from '../../bookstores/application/bookstores.store';
import { CatalogStore } from '../../catalog/application/catalog.store';
import { BookStockAssembler } from '../infrastructure/assemblers/book-stock.assembler';
@Injectable({ providedIn: 'root' })
/** Coordinates receipt validation, persistence, and reactive inventory state. */
export class InventoryStore {
  private readonly api = inject(InventoryApi);
  readonly bookstores = inject(BookstoresStore);
  readonly catalog = inject(CatalogStore);
  readonly stocks = signal<BookStock[]>([]);
  readonly busy = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  async load(): Promise<void> {
    this.busy.set(true);
    this.error.set('');
    try {
      const [stocks] = await Promise.all([this.api.getBookStocks(), this.bookstores.load()]);
      this.stocks.set(stocks);
    } catch {
      this.error.set('api-error');
    } finally {
      this.busy.set(false);
    }
  }
  async receive(command: ReceiveBooksCommand): Promise<boolean> {
    if (this.saving()) return false;
    this.error.set('');
    this.saving.set(true);
    try {
      await this.bookstores.load();
      const store = this.bookstores.forSpecialty(command.specialty);
      if (!store) throw new Error('no-owner');
      const book = this.catalog.books().find((b) => b.key === command.bookKey);
      if (!book) throw new Error('invalid-selection');
      if (!ReceiveBooksCommand.validCopies(command.copies, store.minimumCopies))
        throw new Error('copies-invalid');
      const resource = await this.api.stocks.create({
        bookstoreId: store.id,
        bookKey: book.key,
        bookTitle: book.title,
        authorName: book.authorName,
        copies: command.copies,
        receivedAt: new Date().toISOString(),
      });
      this.stocks.update((items) => [...items, BookStockAssembler.toEntity(resource)]);
      return true;
    } catch (e) {
      this.error.set(
        e instanceof Error &&
          ['no-owner', 'invalid-selection', 'copies-invalid'].includes(e.message)
          ? e.message
          : 'save-error',
      );
      return false;
    } finally {
      this.saving.set(false);
    }
  }
}
