import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { IElementDataModel } from '../../core/element.data.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule} from '@angular/material/input'
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';

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
  ]
})
export class NuclidePickerComponent
  implements OnInit
{
  @Input() title!: string | null;
  @Input() role!: string;
  @Input() elements!: IElementDataModel[] | null;
  @Input() formGroupName!: string; // the subgroup in fusionForm

  form!: FormGroup;
  spinPanelState = 0;

  constructor(private fb: FormBuilder, private fgd: FormGroupDirective){
  }
  ngOnInit(): void {
    this.form = this.fgd.control.get(this.formGroupName) as FormGroup;
  }
  viewProviders: [
    { provide: ControlContainer; useExisting: FormGroupDirective; }
  ] | undefined

  toggleSpinState = () => {
    this.spinPanelState = this.spinPanelState++ % 2;
  }

  elementOptionValue = (element: IElementDataModel): string => {
    return (this.role === 'query') ? element.E + ' - ' + element.EName : element.E;
  }

}
