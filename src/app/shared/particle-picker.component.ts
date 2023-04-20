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
import { SpinPickerComponent } from './spin-picker.component';

@Component({
  selector: 'mfmp-particle-picker',
  standalone: true,
  template: `
    <form [formGroup]="form">
      <mat-card formGroupName="{{ formName }}">
        <mat-card-header>{{ title }}</mat-card-header>
        <mat-card-content>
          <form-field
            class="{{ invisible }}"
            formControlName="selectedElements"
            appearance="outline">
            <mat-select placeholder="select element(s)" multiple>
              <mat-option *ngFor="let element of elements" [value]="element.E">
                {{ element.E }} - {{ element.EName }}
              </mat-option>
            </mat-select>
          </form-field>
          <mfmp-spin-picker
            [formName]="formName"
            [role]="role"></mfmp-spin-picker>
        </mat-card-content>
      </mat-card>
    </form>
  `,
  styles: [
    `
      .hidden {
        visibility: hidden;
      }
    `
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    SpinPickerComponent
  ]
})
export class ParticlePickerComponent
  extends MfmpBaseComponent
  implements OnInit
{
  @Input() formName!: string;
  @Input() title!: string | null;
  @Input() role!: string;
  @Input() elements!: IElementDataModel[] | null;
  element: string = '';
  invisible: string = '';
  form!: FormGroup;

  constructor(private parentForm: FormGroupDirective) {
    super();
  }

  ngOnInit() {
    console.log(this.parentForm);
    if (this.formName && this.parentForm) {
      this.form = this.parentForm.control.get(this.formName) as FormGroup;
    }
    this.invisible = this.role === 'result' ? 'hidden' : '';
    console.log('formName', this.formName);
  }
}
