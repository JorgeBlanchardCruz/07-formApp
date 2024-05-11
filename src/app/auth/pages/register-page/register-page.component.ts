import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationsService } from '../../../shared/services/validations.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  public form: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern(this.validations.firstNameAndLastnamePattern)]],
    email: ['', [ Validators.required, Validators.pattern(this.validations.emailPattern) ]],
    username: ['', [ Validators.required, this.validations.cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  });

  constructor(
    private fb: FormBuilder,
    public validations: ValidationsService
  ) {
    this.validations.initialize(this.form);
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value);
    this.form.reset();
  }

}
