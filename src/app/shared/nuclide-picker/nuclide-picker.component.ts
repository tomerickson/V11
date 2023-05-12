import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BehaviorSubject } from 'rxjs';
import { IElementDataModel } from '../../core/models/element.data.model';
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
    MatSlideToggleModule,
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

   spinPanelState = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
  }

  toggleSpinState = () => {
    this.spinPanelState = this.spinPanelState++ % 2;
  };

  elementOptionValue = (element: IElementDataModel): string => {
    return this.role === 'query'
      ? element.E + ' - ' + element.EName
      : element.E;
  };
}
