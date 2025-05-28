import { IElementDataModel } from './../../core/models/element-data.model';
import { Component, inject, Input, OnInit } from '@angular/core';
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
  @Input({ required: true }) title!: string | null;
  @Input({ required: true }) role!: 'query' | 'result';
  @Input({ required: true }) elementsList: IElementDataModel[] | null = null;
  @Input({ required: true }) multiselect!: boolean;
  @Input({ required: true }) caption!: string;
  @Input({ required: true }) formGroupName!: string;

  dialogRef = inject(MatDialogRef<NuclideDialogComponent>);
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
    const result: number = (this.role === 'result') as any as number;
    const multi: number = !this.multiselect as any as number;
    return multi * 2 + result;
  };

  ngOnInit(): void {
    this.nuclideForm = this.fgd.control; //.get(this.formGroupName) as FormGroup;
  }

  elementOptionValue = (element: IElementDataModel): string => {
    return this.role === 'query'
      ? (element.E + ' - ' + element.EName).padEnd(50)
      : element.E;
  };
}
