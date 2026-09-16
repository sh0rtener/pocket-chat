import { FormControl, FormGroup, Validators } from '@angular/forms';

export function createChatFormGroup() {
  return new FormGroup({
    message: new FormControl('', Validators.required),
    file: new FormControl<File | null>(null),
  });
}
