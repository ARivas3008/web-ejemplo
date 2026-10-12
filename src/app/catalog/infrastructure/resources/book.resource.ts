/**
 * @summary HTTP payload contract; converted before entering the domain.
 * @author Bernie Aarón Rivas Méndez
 */
/** HTTP payload contract; converted before entering the domain. */
export interface BookResource {
  key: string;
  title: string;
  authors?: { name?: string }[];
  first_publish_year?: number;
  cover_id?: number;
}
export interface SubjectResponse {
  works: BookResource[];
}
