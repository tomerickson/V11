import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  inject
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  FloatLabelType,
  MatFormFieldModule
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { LenrEventsDetailComponent } from '../lenr-events-detail/lenr-events-detail.component';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'mfmp-lenr-events-face',
  standalone: true,
  imports: [
    CdkDrag,
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    ReactiveFormsModule,
    LenrEventsDetailComponent
  ],
  templateUrl: './lenr-events-face.component.html',
  styleUrls: ['./lenr-events-face.component.scss']
})
export class LenrEventsFaceComponent implements OnInit, AfterViewInit {
  private _maxId!: number | null;
  private _categories!: string[] | null;

  initialCategory!: string;

  @Input({ required: true }) categories! : string[] | null;
  @Input({ required: true }) eventCount!: number | null;

  get maxId(): number | null {
    return this._maxId;
  }
  
  @Input({ required: true }) set maxId(value: number | null) {
    this._maxId = value;
    this.eventForm?.get('s_Index_to')?.setValue(value);
  }

  @Input({ required: true }) description!: string | null;

  fb = inject(FormBuilder);

  leftDiv!: HTMLElement;
  rightDiv!: HTMLElement;
  leftWidth = 0;
  rightWidth = 0;
  now = new Date();
  year = this.now.getFullYear();
  get pageDescription() {
    if (this.eventCount) {
      return this.description?.replace(
        'eventCount',
        this.eventCount.toString()
      );
    } else {
      return this.description;
    }
  }

  eventForm!: FormGroup;

  get minYear(): number | null {
    return this.minValue('s_Year_from');
  }
  get maxYear(): number | null {
    return this.maxValue('s_Year_to');
  }

  get minIndex(): number | null {
    return this.minValue('s_Index_from');
  }
  get maxIndex(): number | null {
    return this.maxValue('s_Index_to');
  }

  floatLabelControl = new FormControl('auto' as FloatLabelType);
  hideRequiredControl = new FormControl(false);

  ngOnInit(): void {
    this.buildForm();
  }
  ngAfterViewInit(): void {}

  buildForm = () => {
    this.eventForm = this.fb.group({
      s_Year_from: new FormControl(this.year),
      s_Year_to: new FormControl(this.year),
      s_Index_from: new FormControl(1),
      s_Index_to: new FormControl(this.maxId),
      s_Category: new FormControl('All'),
      s_Author: new FormControl(),
      s_Title: new FormControl(),
      s_Keywords: new FormControl()
    });
    this.eventForm.get('s_Category')?.setValue('All');
  };

  minValue = (fieldName: string): number | null => {
    const min = this.eventForm.get(fieldName)?.value;
    return min ? min : null;
  };

  maxValue = (fieldName: string): number | null => {
    const max = this.eventForm.get(fieldName)?.value;
    return max ? max : null;
  };

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
}
