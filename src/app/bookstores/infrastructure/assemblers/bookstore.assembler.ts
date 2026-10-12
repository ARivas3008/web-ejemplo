/**
 * @summary Isolates wire representations from domain naming and behavior.
 * @author Bernie Aarón Rivas Méndez
 */
import { Bookstore } from '../../domain/model/bookstore.entity';
import { BookstoreResource } from '../resources/bookstore.resource';
/** Isolates wire representations from domain naming and behavior. */
export class BookstoreAssembler {
  static toEntity(r: BookstoreResource): Bookstore {
    return new Bookstore(Number(r.id), r.name, r.specialty, r.minimumCopies);
  }
}
