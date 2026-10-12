/**
 * @summary Aggregation counts a work once regardless of the number of receipts.
 * @author Bernie Aarón Rivas Méndez
 */
import { BookStock } from '../../../inventory/domain/model/book-stock.entity';
/** Aggregation counts a work once regardless of the number of receipts. */
export function summarizeInventory(stocks: readonly BookStock[], minimumCopies: number) {
  const groups = new Map<string, { bookKey: string; bookTitle: string; copies: number }>();
  for (const stock of stocks) {
    const group = groups.get(stock.bookKey) ?? {
      bookKey: stock.bookKey,
      bookTitle: stock.bookTitle,
      copies: 0,
    };
    group.copies += stock.copies;
    groups.set(stock.bookKey, group);
  }
  const books = [...groups.values()];
  return {
    books,
    availableTitles: books.length,
    replenishmentRequired: books.filter((b) => b.copies < minimumCopies).length,
  };
}
