import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MfmpBaseComponent } from '../core/mfmp-base-component';

@Component({
  selector: 'mfmp-spin-picker',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule
  ],
  template: `
    <div class="flexrow">
      <div>
        <p>Spin:</p>
        <p>Uncheck a spin category to exclude it from the {{ role }}.</p>
      </div>
      <div class="flexcolumn">
        <form-field formControlName="atomicSpin">
          <div>Atomic</div>
          <div><mat-checkbox checked="true" value="1">Boson</mat-checkbox></div>
          <div>
            <mat-checkbox checked="true" value="2">Fermion</mat-checkbox>
          </div>
        </form-field>
      </div>
      <div class="flexcolumn">
        <form-field formControlName="nuclearSpin">
          <div>Nuclear</div>
          <div><mat-checkbox checked="true" value="1">Boson</mat-checkbox></div>
          <div>
            <mat-checkbox checked="true" value="2">Fermion</mat-checkbox>
          </div>
        </form-field>
      </div>
    </div>
  `,
  styles: [
    `
      div.center {
        text-align: center;
      }
      div.flexrow {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-around;
      }
      div.flexcolumn {
        display: flex;
        flex-direction: column;
      }
    `
  ]
})
export class SpinPickerComponent extends MfmpBaseComponent {

  @Input() formName!: string;
  @Input() role!: string;
  form!: FormGroup;

  ngOnInit() {
    this.form = this.formGroup.control.get(this.formName) as FormGroup;
  }

  constructor(private formGroup: FormGroupDirective) {
    super();
  }
}
