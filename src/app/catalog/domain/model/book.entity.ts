/**
 * @summary Framework-independent Book domain model.
 * @author Bernie Aarón Rivas Méndez
 */
/** Framework-independent Book domain model. */
export class Book {
  constructor(
    public readonly key: string,
    public readonly title: string,
    public readonly authorName: string,
    public readonly firstPublishYear: number | null,
    public readonly coverId: number | null,
  ) {}
}
