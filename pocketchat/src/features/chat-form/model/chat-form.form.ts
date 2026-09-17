import { FormControl, FormGroup, Validators } from '@angular/forms';

export function createChatFormGroup() {
  return new FormGroup({
    message: new FormControl(''),
    file: new FormControl<File | null>(null),
  });
}
