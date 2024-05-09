import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  private form!: FormGroup;

  public setForm( form: FormGroup ): void {
    this.form = form;
  }

  public isNotValidField( field: string) : boolean | any {
    if (!this.form.get(field))
      return false;

    return this.form.get(field)?.errors && this.form.get(field)?.touched;
  }

  public isNotValidFieldArray( formArray: FormArray, index: number ): boolean | any {
    if (!formArray.controls[index])
      return false;

    return formArray.controls[index].errors && formArray.controls[index].touched;
  }

  public getErrorMessage( field: string ): string | null {
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

  private getErrorMessageByError( error: string, value: any ): string {
    const messages: any = {
      required: 'Este campo es requerido',
      minlength: `Este campo debe tener al menos ${value.requiredLength} caracteres`,
      min: `El valor mínimo es ${value.min}`,
      max: `El valor máximo es ${value.max}`,
    };

    return messages[error];
  }

}
