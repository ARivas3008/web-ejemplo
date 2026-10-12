/**
 * @summary Reactive receipt form; dependent controls reset on every specialty change.
 * @author Bernie Aarón Rivas Méndez
 */
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InventoryStore } from '../../application/inventory.store';
import { ReceiveBooksCommand } from '../../domain/model/receive-books.command';
import { Feedback } from '../../../shared/presentation/components/feedback';
@Component({
  selector: 'app-receive-books',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    TranslatePipe,
    SelectModule,
    InputNumberModule,
    ButtonModule,
    CardModule,
    Feedback,
  ],
  templateUrl: './receive-books.html',
})
/** Reactive receipt form; dependent controls reset on every specialty change. */
export class ReceiveBooks implements OnInit {
  readonly store = inject(InventoryStore);
  private readonly router = inject(Router);
  readonly specialty = signal('');
  readonly maxCopies = signal(0);
  readonly form = new FormGroup({
    specialty: new FormControl('', { nonNullable: true, validators: Validators.required }),
    bookKey: new FormControl('', { nonNullable: true, validators: Validators.required }),
    copies: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.pattern(/^\d+$/),
    ]),
  });
  ngOnInit() {
    void this.store.load();
  }
  async changeSpecialty(): Promise<void> {
    const specialty = this.form.controls.specialty.value;
    this.specialty.set(specialty);
    this.form.controls.bookKey.reset('');
    this.form.controls.copies.reset();
    this.maxCopies.set((this.store.bookstores.forSpecialty(specialty)?.minimumCopies ?? 0) * 2);
    this.form.controls.copies.setValidators([
      Validators.required,
      Validators.min(1),
      Validators.max(this.maxCopies()),
      Validators.pattern(/^\d+$/),
    ]);
    this.form.controls.copies.updateValueAndValidity();
    await this.store.catalog.load(specialty);
  }
  async submit(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const v = this.form.getRawValue();
    if (await this.store.receive(new ReceiveBooksCommand(v.specialty, v.bookKey, v.copies!)))
      await this.router.navigateByUrl('/bookstores/overview');
  }
}
