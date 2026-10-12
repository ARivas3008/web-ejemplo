/**
 * @summary Isolates wire representations from domain naming and behavior.
 * @author Bernie Aarón Rivas Méndez
 */
import { Book } from '../../domain/model/book.entity';
import { BookResource } from '../resources/book.resource';
/** Isolates wire representations from domain naming and behavior. */
export class BookAssembler {
  static toEntity(r: BookResource): Book {
    return new Book(
      r.key,
      r.title,
      r.authors?.[0]?.name?.trim() || 'Unknown Author',
      r.first_publish_year ?? null,
      r.cover_id ?? null,
    );
  }
}
