/**
 * @summary One store card with distinct-title aggregate metrics.
 * @author Bernie Aarón Rivas Méndez
 */
import { Component, computed, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TranslatePipe } from '@ngx-translate/core';
import { Bookstore } from '../../domain/model/bookstore.entity';
import { BookStock } from '../../../inventory/domain/model/book-stock.entity';
import { summarizeInventory } from '../../domain/model/book-inventory';
import { LanguageService } from '../../../shared/application/language.service';
@Component({
  selector: 'app-bookstore-summary',
  standalone: true,
  imports: [CardModule, TranslatePipe],
  templateUrl: './bookstore-summary.html',
})
/** One store card with distinct-title aggregate metrics. */
export class BookstoreSummary {
  readonly store = input.required<Bookstore>();
  readonly stocks = input.required<BookStock[]>();
  readonly language = inject(LanguageService);
  readonly summary = computed(() =>
    summarizeInventory(
      this.stocks().filter((s) => s.bookstoreId === this.store().id),
      this.store().minimumCopies,
    ),
  );
}
