/**
 * @summary HTTP gateway for the inventory context.
 * @author Bernie Aarón Rivas Méndez
 */
import { Injectable } from '@angular/core';
import { BaseApi } from '../../../shared/infrastructure/base-api';
import { BaseEndpoint } from '../../../shared/infrastructure/base-endpoint';
import { environment } from '../../../../environments/environment';
import { BookStockResource } from '../resources/book-stock.resource';
import { BookStockAssembler } from '../assemblers/book-stock.assembler';
@Injectable({ providedIn: 'root' })
/** HTTP gateway for the inventory context. */
export class InventoryApi extends BaseApi {
  readonly stocks = new BaseEndpoint<BookStockResource>(
    this.http,
    environment.apiBase + environment.endpoints.stocks,
  );
  async getBookStocks() {
    return (await this.stocks.list()).map(BookStockAssembler.toEntity);
  }
}
