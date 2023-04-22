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
import { MfmpBaseComponent } from '../../core/mfmp-base-component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule} from '@angular/material/input'
import { MatExpansionModule } from '@angular/material/expansion';

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
    MatGridListModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class NuclidePickerComponent
  extends MfmpBaseComponent
  implements OnInit
{
 // @Input() parentFormName!: string;
  @Input() formGroup!: FormGroup;
  @Input() title!: string | null;
  @Input() role!: string;
  @Input() elements!: IElementDataModel[] | null;
  @Input() formGroupName!: string; // the subgroup in fusionForm
 // @Input() ready!: boolean | null;
  form!: FormGroup;

  viewProviders: [
    { provide: ControlContainer; useExisting: FormGroupDirective; }
  ] | undefined

  constructor(private fb: FormBuilder, private parentForm: FormGroupDirective) {
    super();
  }

  ngOnInit() {
  }
}
