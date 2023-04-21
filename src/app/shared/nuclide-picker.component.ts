import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { IElementDataModel } from '../core/element.data.model';
import { MfmpBaseComponent } from '../core/mfmp-base-component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'mfmp-nuclide-picker',
  standalone: true,
  template: `
    <form [formGroup]="form">
      <mat-card formGroupName="{{ formName }}">
        <mat-card-header>
          <mat-card-title>{{ title }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <ng-container *ngIf="role === 'query'">
            <form-field formControlName="selectedElements" appearance="outline">
              <mat-select placeholder="select element(s)" multiple>
                <mat-option
                  *ngFor="let element of elements"
                  [value]="element.E">
                  {{ element.E }} - {{ element.EName }}
                </mat-option>
              </mat-select>
            </form-field>
          </ng-container>
          <div class="flexrow">
            <div>
              <p>Spin:</p>
              <p>Uncheck a spin category to exclude it from the {{ role }}.</p>
            </div>
            <div class="flexcolumn">
              <form-field formControlName="atomicSpin">
                <div>Atomic</div>
                <div>
                  <mat-checkbox checked="true" value="1">Boson</mat-checkbox>
                </div>
                <div>
                  <mat-checkbox checked="true" value="2">Fermion</mat-checkbox>
                </div>
              </form-field>
            </div>
            <div class="flexcolumn">
              <form-field formControlName="nuclearSpin">
                <div>Nuclear</div>
                <div>
                  <mat-checkbox checked="true" value="1">Boson</mat-checkbox>
                </div>
                <div>
                  <mat-checkbox checked="true" value="2">Fermion</mat-checkbox>
                </div>
              </form-field>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </form>
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
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatSelectModule
  ]
})
export class NuclidePickerComponent
  extends MfmpBaseComponent
  implements OnInit
{
  @Input() parentFormName!: string;
  @Input() formName!: string;
  @Input() title!: string | null;
  @Input() role!: string;
  @Input() elements!: IElementDataModel[] | null;
  element: string = '';
  form!: FormGroup;

  constructor(private parentForm: FormGroupDirective) {
    super();
  }

  ngOnInit() {
    console.log(this.parentForm);
    if (this.formName && this.parentForm) {
      this.form = this.parentForm.control.get(this.parentFormName) as FormGroup;
    }
    console.log('formName', this.formName);
  }
}
