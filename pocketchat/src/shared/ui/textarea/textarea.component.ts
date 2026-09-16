import { Component, forwardRef, input } from '@angular/core';
import { AbstractControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent {
  label = input<string>();
  placeholder = input<string>('');
  id = input.required<string>();
  disabled = input<boolean>();
  value = '';

  control = input<AbstractControl | null>(null);

  onInput(event: Event) {
    const input = event.target as HTMLTextAreaElement;

    this.value = input.value;
    this.onChange(this.value);
  }

  private onChange = (value: string) => {};
  onTouched = () => {};
  onBlur() {
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  errorMessage(): string | null {
    const errors = this.control()?.errors;

    if (!errors) {
      return null;
    }

    if (errors['required']) {
      return 'Поле обязательно';
    }

    if (errors['minlength']) {
      return `Минимум ${errors['minlength'].requiredLength} символов`;
    }

    if (errors['maxlength']) {
      return `Максимум ${errors['maxlength'].requiredLength} символов`;
    }

    return 'Некорректное значение';
  }
}
