/**
 * @summary Framework-independent Bookstore domain model.
 * @author Bernie Aarón Rivas Méndez
 */
/** Framework-independent Bookstore domain model. */
export class Bookstore {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly specialty: string,
    public readonly minimumCopies: number,
  ) {}
}
