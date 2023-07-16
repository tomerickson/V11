import { CdkDrag } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  inject
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
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
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { LenrEventsDetailComponent } from '../lenr-events-detail/lenr-events-detail.component';
import { LenrEventsResultsComponent } from '../lenr-events-results/lenr-events-results.component';
import { LenrEventsRequest } from 'src/app/core/models/lenr-events-request.model';
import { ILenrEventsLookup } from 'src/app/core/models/lenr-events-lookup.model';
import { ILenrEventDetail } from 'src/app/core/models/lenr-event-detail.model';
import { ProgressSpinnerComponent } from 'src/app/shared/progress-spinner/progress-spinner.component';
import {
  indexRangeValidator,
  yearRangeValidator
} from '../lenr-events-form.validators';

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
    LenrEventsDetailComponent,
    LenrEventsResultsComponent,
    ProgressSpinnerComponent
  ],
  templateUrl: './lenr-events-face.component.html',
  styleUrls: ['./lenr-events-face.component.scss']
})
export class LenrEventsFaceComponent implements OnInit {
  private _maxId!: number | null;
  private _categories: string[] = [];

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  @Output() searcher: EventEmitter<LenrEventsRequest> =
    new EventEmitter<LenrEventsRequest>();
  @Output() fetcher: EventEmitter<LenrEventsRequest> =
    new EventEmitter<LenrEventsRequest>();

  @Input({ required: true }) eventCount!: number | null;
  @Input({ required: true }) description!: string | null;
  @Input({ required: true }) eventList: ILenrEventsLookup[] | null = null;
  @Input({ required: true }) loading!: boolean | null;
  @Input({ required: true }) ready!: boolean | null;
  @Input({ required: true }) event!: ILenrEventDetail | null;

  get categories(): string[] {
    return this._categories !== null ? this._categories : [];
  }
  @Input({ required: true }) set categories(value: string[] | null) {
    if (value) this._categories = value;
  }
  get maxId(): number | null {
    return this._maxId;
  }
  @Input({ required: true }) set maxId(value: number | null) {
    this._maxId = value;
    this.eventForm?.get('s_Index_to')?.setValue(value);
  }

  fb = inject(FormBuilder);

  initialCategory!: string;
  now = new Date();
  year = this.now.getFullYear();
  selectedTabIndex = 0;

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

  eventId!: number | null; // Selected event Id
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

  buildForm = () => {
    this.eventForm = this.fb.group(
      {
        s_Year_from: new FormControl(this.year, [Validators.required]),
        s_Year_to: new FormControl(this.year, [Validators.required]),
        s_Index_from: new FormControl(1, [Validators.required]),
        s_Index_to: new FormControl(this.maxId, [Validators.required]),
        s_Category: new FormControl('All', [Validators.required]),
        s_Author: new FormControl(),
        s_Title: new FormControl(),
        s_Keywords: new FormControl()
      },
      { validators: [indexRangeValidator, yearRangeValidator] }
    );
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

  max(a: number | null, b: number | null) {
    return a && b ? (a > b ? a : b) : a ? a : b;
  }
  min(a: number | null, b: number | null) {
    return a && b ? (a < b ? a : b) : a ? a : b;
  }

  selectEvent = (eventId: number) => {
    this.eventId = eventId;
    this.tabGroup.selectedIndex = 2;
  };

  search = () => {
    const request = { ...this.eventForm.value } as LenrEventsRequest;
    request.doit = 'refresh';
    this.searcher.emit(request);
  };

  fetch = () => {
    const request = { ...this.eventForm.value } as LenrEventsRequest;
    request.r_id = this.eventId;
    request.doit = 'refresh';
    this.fetcher.emit(request);
  };

  back() {
    this.tabGroup.selectedIndex = 1;
  }

  onSelectedIndexChange(index: number) {
    switch (index) {
      case 0:
        this.eventId = null;
        break;
      case 1: {
        this.search();
        break;
      }
      case 2: {
        this.fetch();
        break;
      }
    }
  }

  nextRow = () => {};
  priorRow = () => {};
}
