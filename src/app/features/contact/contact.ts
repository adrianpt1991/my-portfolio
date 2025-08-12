import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [NgOptimizedImage, CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact implements OnInit {
  private fb = inject(FormBuilder);
  readonly endpoint = signal<string>('https://formspree.io/f/movlyoze');

  readonly sending = signal(false);
  readonly sent = signal<null | 'ok' | 'fail'>(null);

  public form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: [''],
    });
  }

  async submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.sending.set(true);
    this.sent.set(null);

    try {
      const res = await fetch(this.endpoint(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.form.value.name,
          email: this.form.value.email,
          message: this.form.value.message,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      this.sent.set('ok');
      this.form.reset();
    } catch {
      this.sent.set('fail');
    } finally {
      this.sending.set(false);
    }
  }

  onNameInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.form.controls['name'].setValue(target.value);
    this.form.controls['name'].markAsTouched();
  }

  onEmailInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.form.controls['email'].setValue(target.value);
    this.form.controls['email'].markAsTouched();
  }

  onMessageInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.form.controls['message'].setValue(target.value);
  }

}
