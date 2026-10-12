/**
 * @summary Keeps document language and locale formatting synchronized.
 * @author Bernie Aarón Rivas Méndez
 */
import { Injectable, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
@Injectable({ providedIn: 'root' })
/** Keeps document language and locale formatting synchronized. */
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);
  readonly current = signal('EN');
  /** Changes locale only after its translation dictionary loads. */
  use(value: string): void {
    if (value !== 'EN' && value !== 'ES') return;
    this.translate.use(value.toLowerCase()).subscribe(() => {
      this.current.set(value);
      this.document.documentElement.lang = value.toLowerCase();
    });
  }
  number(value: number): string {
    return new Intl.NumberFormat(this.current() === 'ES' ? 'es-PE' : 'en-US', {
      maximumFractionDigits: 2,
    }).format(value);
  }
  money(value: number): string {
    return new Intl.NumberFormat(this.current() === 'ES' ? 'es-PE' : 'en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }
  date(value: string): string {
    return new Intl.DateTimeFormat(this.current() === 'ES' ? 'es-PE' : 'en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value));
  }
}
