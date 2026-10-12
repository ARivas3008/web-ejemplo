/**
 * @summary Reusable loading, error and retry presentation.
 * @author Bernie Aarón Rivas Méndez
 */
import { Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [TranslatePipe, MessageModule, ButtonModule],
  template: `@if (busy()) {
      <p role="status" aria-live="polite">
        <i class="pi pi-spin pi-spinner mr-2" aria-hidden="true"></i>{{ 'loading' | translate }}
      </p>
    }
    @if (error()) {
      <div role="alert" class="mb-3">
        <p-message severity="error">{{ error() | translate }}</p-message>
        @if (retryable()) {
          <p-button class="mt-2" [ariaLabel]="'retry' | translate" [label]="'retry' | translate" (onClick)="retry.emit()" />
        }
      </div>
    }`,
})
/** Reusable loading, error and retry presentation. */
export class Feedback {
  readonly busy = input(false);
  readonly error = input('');
  readonly retryable = input(true);
  readonly retry = output<void>();
}
