/**
 * @summary Displays the requested URL safely through Angular interpolation.
 * @author Bernie Aarón Rivas Méndez
 */
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [TranslatePipe, RouterLink, ButtonModule],
  template: `<section aria-labelledby="not-found-title">
    <h1 id="not-found-title">{{ 'not-found' | translate }}</h1>
    <p>
      {{ 'missing-route' | translate }}: <strong>{{ router.url }}</strong>
    </p>
    <p-button [routerLink]="home" [ariaLabel]="'back-home' | translate" [label]="'back-home' | translate" icon="pi pi-home" />
  </section>`,
})
/** Displays the requested URL safely through Angular interpolation. */
export class PageNotFound {
  readonly router = inject(Router);
  readonly home = environment.homeRoute;
}
