import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationsService } from '../../../shared/services/validations.service';

@Component({
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent implements OnInit{

  public form = this.fb.group({
    gender: ['M', Validators.required],
    wantNofitications: [true, Validators.required],
    termAndConditions: [false, Validators.requiredTrue],
  });

  public person = {
    gender: 'F',
    wantNofitications: false
  }

  constructor(
    private fb: FormBuilder,
    public errors: ValidationsService
  ) {
    this.errors.setForm(this.form);
  }

  ngOnInit(): void {
    this.form.reset(this.person);
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { termAndConditions, ...rest } = this.form.value;

    this.person = {
      gender: rest.gender as string,
      wantNofitications: rest.wantNofitications as boolean
    };

    console.log(this.form.value);
    this.form.reset(this.person);
  }

}
