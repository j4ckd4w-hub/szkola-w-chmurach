import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class AuthLoginFormBuilder {
  formBuilder = inject(FormBuilder);

  createForm(): FormGroup<AuthLoginForm> {
    return this.formBuilder.group({
      email: this.formBuilder.control<string | null>(null),
      password: this.formBuilder.control<string | null>(null)
    });
  }
}

export interface AuthLoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
