import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CustomPaginatorComponent } from '../shared/custom-paginator/custom-paginator.component';
import { NuclidePickerComponent } from '../shared/nuclide-picker/nuclide-picker.component';
import { SliderInputComponent, SliderLayout } from '../shared/slider-input';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mfmp-testpage',
  standalone: true,
  templateUrl: 'testpage.component.html',
  styleUrls: ['testpage.component.scss'],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSortModule,
    MatTableModule,
    NgFor,
    FormsModule,
    NuclidePickerComponent,
    CustomPaginatorComponent,
    SliderInputComponent
  ]
})
export class TestPageFaceComponent implements OnInit {
  // model!: {key: string, value: number}[]
  layout: SliderLayout = 'row';
  elements =  'vsl';
  form!: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({myControl: 34});
  }

  setElements(event: Event) {

    const ctl = event.target as HTMLInputElement;
    const vlu = ctl.value;
    this.elements = vlu;
  }
}
