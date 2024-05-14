import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root' //significa que el servicio se va a inyectar en el root de la aplicación como singleton
})
export class ValidationsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  private form!: FormGroup;

  public initialize(form: FormGroup): void {
    this.form = form;
  }

  public isNotValidField(field: string): boolean | any {
    if (!this.form.get(field))
      return false;

    return this.form.get(field)?.errors && this.form.get(field)?.touched;
  }

  public isNotValidFieldArray(formArray: FormArray, index: number): boolean | any {
    if (!formArray.controls[index])
      return false;

    return formArray.controls[index].errors && formArray.controls[index].touched;
  }

  public getErrorMessage(field: string): string | null {
    if (!this.form.get(field))
      return null;

    const errors = this.form.get(field)?.errors || {};

    for (const error in errors) {
      if (errors.hasOwnProperty(error)) {
        return this.getErrorMessageByError(error, errors[error]);
      }
    }

    return null;
  }

  private getErrorMessageByError(error: string, value: any): string {
    const messages: any = {
      required: 'Este campo es requerido',
      minlength: `Este campo debe tener al menos ${value.requiredLength} caracteres`,
      min: `El valor mínimo es ${value.min}`,
      max: `El valor máximo es ${value.max}`,
    };

    return messages[error];
  }

  public cantBeStrider = (control: FormControl): ValidationErrors | null => {

    const value = control.value?.trim().toLowerCase();

    if (value === 'strider') {
      return {
        noStrider: true
      }
    }

    return null;
  }

  public IsFieldOneEqualToFieldTwo(field1: string, field2: string) {

    return (formGroup: AbstractControl): ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }
  }

}
