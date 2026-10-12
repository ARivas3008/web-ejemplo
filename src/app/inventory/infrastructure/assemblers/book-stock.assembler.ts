/**
 * @summary Isolates wire representations from domain naming and behavior.
 * @author Bernie Aarón Rivas Méndez
 */
import { BookStock } from '../../domain/model/book-stock.entity';
import { BookStockResource } from '../resources/book-stock.resource';
/** Isolates wire representations from domain naming and behavior. */
export class BookStockAssembler {
  static toEntity(r: BookStockResource): BookStock {
    return new BookStock(
      Number(r.id),
      Number(r.bookstoreId),
      r.bookKey,
      r.bookTitle,
      r.authorName,
      r.copies,
      r.receivedAt,
    );
  }
}
