/**
 * @summary Route-level overview; reloads persisted inventory on entry.
 * @author Bernie Aarón Rivas Méndez
 */
import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { InventoryStore } from '../../../inventory/application/inventory.store';
import { BookstoreSummary } from '../components/bookstore-summary';
import { Feedback } from '../../../shared/presentation/components/feedback';
@Component({
  selector: 'app-bookstore-overview',
  standalone: true,
  imports: [TranslatePipe, BookstoreSummary, Feedback],
  templateUrl: './bookstore-overview.html',
})
/** Route-level overview; reloads persisted inventory on entry. */
export class BookstoreOverview implements OnInit {
  readonly store = inject(InventoryStore);
  ngOnInit() {
    void this.store.load();
  }
}
