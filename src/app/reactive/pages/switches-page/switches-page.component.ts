import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorsService } from '../../services/errors.service';

@Component({
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent {

  public form = this.fb.group({
    gender: ['M', Validators.required],
    wantNofitications: [true, Validators.required],
    termAndConditions: [false, Validators.requiredTrue],
  });

  constructor(
    private fb: FormBuilder,
    public errors: ErrorsService
  ) {
    this.errors.setForm(this.form);
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
