/**
 * @summary HTTP payload contract; converted before entering the domain.
 * @author Bernie Aarón Rivas Méndez
 */
/** HTTP payload contract; converted before entering the domain. */
export interface BookStockResource {
  id: number;
  bookstoreId: number;
  bookKey: string;
  bookTitle: string;
  authorName: string;
  copies: number;
  receivedAt: string;
}
