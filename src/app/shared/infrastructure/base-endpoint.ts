/**
 * @summary Typed request/response endpoint exposing only the operations required here.
 * @author Bernie Aarón Rivas Méndez
 */
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, timeout } from 'rxjs';
/** Typed request/response endpoint exposing only the operations required here. */
export class BaseEndpoint<TResource, TRequest = Omit<TResource, 'id'>> {
  constructor(
    private readonly http: HttpClient,
    private readonly url: string,
  ) {}
  /** Loads all resources and bounds waiting time. */
  list(): Promise<TResource[]> {
    return firstValueFrom(this.http.get<TResource[]>(this.url).pipe(timeout(20000)));
  }
  /** Leaves identifier generation to JSON Server. */
  create(request: TRequest): Promise<TResource> {
    return firstValueFrom(this.http.post<TResource>(this.url, request).pipe(timeout(20000)));
  }
}
