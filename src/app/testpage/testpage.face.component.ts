import { CommonModule, NgFor } from '@angular/common';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormsModule
} from '@angular/forms';
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
import { SliderInputComponent, sliderLayoutDirection } from '../shared/slider-input';

@Component({
    selector: 'mfmp-testpage',
    standalone: true,
    templateUrl: 'testpage.component.html',
    styleUrls: ['testpage.component.scss'],
    imports: [
        CommonModule,
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
export class TestPageFaceComponent implements OnInit{

  // model!: {key: string, value: number}[]
  layout: sliderLayoutDirection = 'column'
  myControl = 34;
  constructor() {
    // this.model.push({key: 'myControl', value: 34});
    }


  ngOnInit(): void {
    }

    handleSliderChange = (slider: {key: string, value: number}): void => {
     this.myControl = slider.value;
    }
}
