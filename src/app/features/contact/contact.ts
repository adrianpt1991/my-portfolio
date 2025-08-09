import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [NgOptimizedImage, CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private fb = inject(FormBuilder);

  readonly sending = signal(false);
  readonly sent = signal<null | 'ok' | 'fail'>(null);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  async submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    console.log(this.form.value)
  }

  onNameInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.form.controls.name.setValue(target.value);
  }

  onEmailInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.form.controls.email.setValue(target.value);
  }

  onMessageInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.form.controls.message.setValue(target.value);
  }

}
