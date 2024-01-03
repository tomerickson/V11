import { CommonModule, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IElementDataModel } from '../../core/models/element-data.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'mfmp-nuclide-picker',
  standalone: true,
  templateUrl: './nuclide-picker.component.html',
  styleUrls: ['./nuclide-picker.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatTooltipModule,
    NgSwitch,
    NgSwitchCase
  ],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class NuclidePickerComponent implements OnInit {
  @Input({ required: true }) title!: string | null;
  @Input({ required: true }) role!: 'query' | 'result';
  @Input({ required: true }) elementsList: IElementDataModel[] | null = null;
  @Input({ required: true }) multiselect!: boolean;
  @Input({ required: true }) caption!: string;
  @Input({ required: true }) formGroupName!: string;

  fgd = inject(FormGroupDirective);
  nuclideForm!: FormGroup;
  hoverMessage = 'Click below to select a spin state, or select Either for both.';
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
