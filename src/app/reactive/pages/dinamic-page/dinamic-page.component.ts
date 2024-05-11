import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidationsService } from '../../../shared/services/validations.service';

@Component({
  templateUrl: './dinamic-page.component.html',
  styles: ``
})
export class DinamicPageComponent {

  public form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Death Stranding', Validators.required],
      ['Sonic Mania', Validators.required],
      ['Hellblade', Validators.required],
      ['The Talos Principle', Validators.required],
    ]),
  });

  public newFavorite = new FormControl('', Validators.required);

  constructor(
    private fb: FormBuilder,
    public errors: ValidationsService
  ) {
    this.errors.setForm(this.form);
  }

  public get favoriteGames(): FormArray {
    return this.form.get('favoriteGames') as FormArray;
  }

  public onSubmit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value);
    this.favoriteGames.clear();
    this.form.reset();
  }

  public onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  public onAddFavorite(): void {
    if (this.newFavorite.invalid) {
      this.newFavorite.markAsTouched();
      return;
    }

    const newGame = this.newFavorite.value;
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));

    this.newFavorite.reset();
  }

}
