import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
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
import { SpinPickerComponent } from '../spin-picker/spin-picker.component';

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
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatTooltipModule,
    SpinPickerComponent
  ]
})
export class NuclidePickerComponent implements OnInit {
  @Input() title!: string | null;
  @Input() role!: string;
  @Input() elements: IElementDataModel[] | null = null;
  @Input() formGroupName!: string; // the subgroup in fusionForm
  @Input() form!: FormGroup;
  @Input() caption!: string;

  constructor() {}

  ngOnInit(): void {
    /**
     * This hack forces the form to recognize the first change
     */
    this.form.get(`${this.formGroupName}.selectedElements`)?.patchValue('');
  }

  elementOptionValue = (element: IElementDataModel): string => {
    return this.role === 'query'
      ? (element.E + ' - ' + element.EName).padEnd(50)
      : element.E;
  };
}
