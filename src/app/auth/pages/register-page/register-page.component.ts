import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationsService } from '../../../shared/services/validations.service';
import { EmailValidator } from '../../../shared/services/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  public form: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern(this.validationsService.firstNameAndLastnamePattern)]],
    email: ['', [ Validators.required, Validators.pattern(this.validationsService.emailPattern)], [this.emailValidator]],
    username: ['', [ Validators.required, this.validationsService.cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  }, {
    validators: [ this.validationsService.IsFieldOneEqualToFieldTwo('password', 'password2') ]
  }
  );

  public get customValidators(): ValidationsService {
    return this.validationsService;
  }

  constructor(
    private fb: FormBuilder,
    private validationsService: ValidationsService,
    private emailValidator: EmailValidator
  ) {
    this.validationsService.initialize(this.form);
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
