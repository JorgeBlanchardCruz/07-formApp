import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationsService } from '../../../shared/services/validations.service';

const rtx5090 = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: 6
};

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit{

  //otra manera
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl('', [], []),
  //   price: new FormControl(0, [], []),
  //   inStorage: new FormControl(0, [], [])
  // });


  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3)]],
    price: [0, [ Validators.required, Validators.min(0)]],
    inStorage: [0, [ Validators.required, Validators.min(0)]]
  });

  constructor(
    private fb: FormBuilder,
    public errors: ValidationsService,
  ) {
    this.errors.setForm(this.myForm);
  }

  ngOnInit(): void {
    this.myForm.reset(rtx5090);
  }

  public onSave(): void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset({ price: 10, inStorage: 0});
  }

}
