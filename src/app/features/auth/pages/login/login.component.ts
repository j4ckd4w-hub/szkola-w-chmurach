import { Component, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLoginFormBuilder } from '../../forms';
import { Button } from 'primeng/button';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Store } from '@ngrx/store';
import { authLoginAction, selectAuthLoginErrorState, selectAuthLoginLoadingState } from '@core/state/features/auth';
import { AuthStoreModule } from '@core/state/features/auth/store.module';

@Component({
  selector: 'app-login',
  imports: [
    Card,
    InputText,
    ReactiveFormsModule,
    Button,
    FormsModule,
    NgTemplateOutlet,
    AsyncPipe,
    AuthStoreModule
  ],
  providers: [AuthLoginFormBuilder],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly store = inject(Store);
  readonly formBuilder = inject(AuthLoginFormBuilder);
  readonly form = this.formBuilder.createForm();
  loginLoadingState$ = this.store.select(selectAuthLoginLoadingState);
  loginErrorState$ = this.store.select(selectAuthLoginErrorState);

  submit() {
    this.store.dispatch(authLoginAction({
      payload: this.form.getRawValue()
    }));
  }
}
