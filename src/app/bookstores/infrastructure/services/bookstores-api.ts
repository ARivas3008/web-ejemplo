/**
 * @summary HTTP gateway for the bookstores context.
 * @author Bernie Aarón Rivas Méndez
 */
import { Injectable } from '@angular/core';
import { BaseApi } from '../../../shared/infrastructure/base-api';
import { BaseEndpoint } from '../../../shared/infrastructure/base-endpoint';
import { environment } from '../../../../environments/environment';
import { BookstoreResource } from '../resources/bookstore.resource';
import { BookstoreAssembler } from '../assemblers/bookstore.assembler';
@Injectable({ providedIn: 'root' })
/** HTTP gateway for the bookstores context. */
export class BookstoresApi extends BaseApi {
  readonly bookstores = new BaseEndpoint<BookstoreResource>(
    this.http,
    environment.apiBase + environment.endpoints.bookstores,
  );
  async getBookstores() {
    return (await this.bookstores.list()).map(BookstoreAssembler.toEntity);
  }
}
