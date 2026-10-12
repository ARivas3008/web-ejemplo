/**
 * @summary Base gateway; domain entities never depend on this class.
 * @author Bernie Aarón Rivas Méndez
 */
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/** Base gateway; domain entities never depend on this class. */
export abstract class BaseApi {
  protected readonly http = inject(HttpClient);
}
