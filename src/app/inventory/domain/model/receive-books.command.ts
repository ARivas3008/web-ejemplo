/**
 * @summary Receipt intent and its business validation, independent of Angular forms.
 * @author Bernie Aarón Rivas Méndez
 */
/** Receipt intent and its business validation, independent of Angular forms. */
export class ReceiveBooksCommand {
  constructor(
    public readonly specialty: string,
    public readonly bookKey: string,
    public readonly copies: number,
  ) {}
  static validCopies(copies: number, minimumCopies: number): boolean {
    return Number.isInteger(copies) && copies > 0 && copies <= minimumCopies * 2;
  }
}
