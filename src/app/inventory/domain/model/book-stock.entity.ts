/**
 * @summary Framework-independent BookStock domain model.
 * @author Bernie Aarón Rivas Méndez
 */
/** Framework-independent BookStock domain model. */
export class BookStock {
  constructor(
    public readonly id: number,
    public readonly bookstoreId: number,
    public readonly bookKey: string,
    public readonly bookTitle: string,
    public readonly authorName: string,
    public readonly copies: number,
    public readonly receivedAt: string,
  ) {}
}
