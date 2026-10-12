/**
 * @summary Open Library anti-corruption gateway.
 * @author Bernie Aarón Rivas Méndez
 */
import { Injectable } from '@angular/core';
import { firstValueFrom, timeout } from 'rxjs';
import { BaseApi } from '../../../shared/infrastructure/base-api';
import { environment } from '../../../../environments/environment';
import { SubjectResponse } from '../resources/book.resource';
import { BookAssembler } from '../assemblers/book.assembler';
@Injectable({ providedIn: 'root' })
/** Open Library anti-corruption gateway. */
export class CatalogApi extends BaseApi {
  async books(specialty: string) {
    const r = await firstValueFrom(
      this.http
        .get<SubjectResponse>(
          `${environment.external.subjectsBase}/${encodeURIComponent(specialty)}.json`,
          { params: { limit: 50 } },
        )
        .pipe(timeout(20000)),
    );
    return (r.works ?? []).map(BookAssembler.toEntity);
  }
}
