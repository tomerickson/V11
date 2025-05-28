import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NuclideDialogComponent } from '../shared/nuclide-dialog/nuclide-dialog.component';
import { IElementDataModel } from '../core/models/element-data.model';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'mfmp-testpage',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    NuclideDialogComponent
  ],
  providers: [MatDialogModule],
  template: `
    <form [formGroup]="fusionForm">
      <div class="nuclides">
        <div class="elements">
          <mfmp-nuclide-dialog
            [role]="'query'"
            [title]="'Left side (E1)'"
            [multiselect]="true"
            [formGroupName]="'leftNuclides'"
            [caption]="'Left'"
            [elementsList]="elements"></mfmp-nuclide-dialog>
          <div class="join">
            <button
              type="button"
              class="mat-elevation-z2"
              mat-flat-button
              (click)="toggleJoin()"
              formControlName="elementJoin"
              ngDefaultControl>
              {{ fusionForm.get('elementJoin')?.value }}
            </button>
          </div>
          <mfmp-nuclide-dialog
            [role]="'query'"
            [title]="'Right side (E2)'"
            [multiselect]="true"
            [formGroupName]="'rightNuclides'"
            [caption]="'Right'"
            [elementsList]="elements"></mfmp-nuclide-dialog>
        </div>
        <div class="results">
          <mfmp-nuclide-dialog
            [role]="'result'"
            [title]="'Results (E)'"
            [multiselect]="true"
            [formGroupName]="'resultNuclides'"
            [caption]="'Result'"
            [elementsList]="elements"></mfmp-nuclide-dialog>
        </div>
      </div>
    </form>
  `,
  styles: `
    .fullheight {
      bottom: 0;
      right: 0;
    }
    .bottom-dock {
      bottom: 5;
      right: 5;
    }
  `
})
export class TestpageHeadComponent implements OnInit {
  @Input({ required: true }) elements!: IElementDataModel[] | null;

  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<NuclideDialogComponent>);
  fusionForm!: FormGroup;

  get options(): FormControl {
    return this.fusionForm.get('options') as FormControl;
  }
  toggleJoin = () => {
    let join: string = this.fusionForm.get('elementJoin')?.value ?? '';
    join = join === 'and' ? 'or' : 'and';
    this.fusionForm.get('elementJoin')?.patchValue(join);
  };

  ngOnInit() {
    this.fusionForm = this.fb.group({
      counter: 0,
      options: ['Core', [Validators.required]],
      elementJoin: new FormControl('and'),
      leftNuclides: this.fb.nonNullable.group({
        selectedElements: new FormControl([]),
        nuclearSpin: new FormControl('bf'),
        atomicSpin: new FormControl('bf')
      }),
      rightNuclides: this.fb.nonNullable.group({
        selectedElements: new FormControl([]),
        nuclearSpin: new FormControl('bf'),
        atomicSpin: new FormControl('bf')
      }),
      resultNuclides: this.fb.nonNullable.group({
        selectedElements: new FormControl([]),
        nuclearSpin: new FormControl('bf'),
        atomicSpin: new FormControl('bf')
      })
    });
  }
}
