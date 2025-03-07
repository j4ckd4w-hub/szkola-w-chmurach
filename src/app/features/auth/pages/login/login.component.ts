import { Component, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLoginFormBuilder } from '../../forms/login.formbuilder';
import { Button } from 'primeng/button';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    Card,
    InputText,
    ReactiveFormsModule,
    Button,
    FormsModule,
    NgTemplateOutlet
  ],
  providers: [AuthLoginFormBuilder],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  readonly formBuilder = inject(AuthLoginFormBuilder);
  readonly form = this.formBuilder.createForm();

  submit() {
    console.log(this.form.value);
  }
}
