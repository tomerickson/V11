import { IElementDataModel } from './../../core/models/element-data.model';
import { Component, inject, input, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NuclidePickerRoleEnum} from './nuclide-dialog.types'
@Component({
  selector: 'mfmp-nuclide-dialog',
  imports: [
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  templateUrl: './nuclide-dialog.component.html',
  styleUrl: './nuclide-dialog.component.scss'
})
export class NuclideDialogComponent implements OnInit {
  dialogRef = inject(MatDialogRef<NuclideDialogComponent>);
  title = input.required<string>();
  role = input.required<'query' | 'result'>();
  elementsList = input.required<IElementDataModel[]>();
  selectedElements = input.required<IElementDataModel[]>();
  multiselect = input.required<boolean>();
  caption = input.required<string>();
formGroupName = input.required<string>();
  fgd = inject(FormGroupDirective);
  nuclideForm!: FormGroup;
  hoverMessage =
    'Click below to select a spin state, or select Either for both.';
  tooltipDelay = 750;

  /**
   * flavor - used to select the correct template
   *
   * 0 = multiselect query
   * 1 = single query
   * 2 = multiselect result
   * 3 = single result;
   */
  flavor = (): number => {
    const result: number = (this.role() === NuclidePickerRoleEnum.result) ? 1 : 0;
    const multi: number = this.multiselect() ? 1 : 0;
    return multi * 2 + result;
  };

  ngOnInit(): void {
    this.nuclideForm = this.fgd.control; //.get(this.formGroupName) as FormGroup;
  }

  elementOptionValue = (element: IElementDataModel): string => {
    return this.role() === NuclidePickerRoleEnum.query
      ? (element.E + ' - ' + element.EName).padEnd(50)
      : element.E;
  };

  close(): void {
    this.dialogRef.close();
  }
}
