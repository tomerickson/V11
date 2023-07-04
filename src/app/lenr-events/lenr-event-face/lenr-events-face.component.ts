import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { LenrEventsDetailComponent } from '../lenr-events-detail/lenr-events-detail.component';
import { RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
import { EventRequest } from '../lenr-events-head.component';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'mfmp-lenr-events-face',
  standalone: true,
  imports: [
    CdkDrag,
    AngularSplitModule,
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    LenrEventsDetailComponent
  ],
  templateUrl: './lenr-events-face.component.html',
  styleUrls: ['./lenr-events-face.component.scss'],
  providers: [AngularSplitModule]
})
export class LenrEventsFaceComponent implements OnInit, AfterViewInit {
  @Input({ required: true }) request!: EventRequest;
  @ViewChild('leftside') leftSide!: ElementRef;
  @ViewChild('rightside') rightSide!: ElementRef;

  fb = inject(FormBuilder);

  leftDiv!: HTMLElement;
  rightDiv!: HTMLElement;
  leftWidth = 0;
  rightWidth = 0;
  now = new Date();
  year = this.now.getFullYear();
  
  eventForm!: FormGroup;

  get minYear(): number | null {
    return this.minValue('s_Year_from');
  }

  get minIndex(): number | null {
    return this.minValue('s_Index_from')
  }

  floatLabelControl = new FormControl('auto' as FloatLabelType);
  hideRequiredControl = new FormControl(false);

  ngOnInit(): void {
    this.buildForm();
  }
  ngAfterViewInit(): void {
    this.getChildren();
  }

  buildForm = () => {
    this.eventForm = this.fb.group({
      s_Year_from: new FormControl(this.year),
      s_Year_to: new FormControl(this.year),
      s_Index_from: new FormControl(),
      s_Index_to: new FormControl(),
      s_Category: new FormControl(),
      s_Author: new FormControl(),
      s_Title: new FormControl(),
      s_Keywords: new FormControl()
    });
  };

  minValue = (fieldName: string): number | null => {
    const min = this.eventForm.get(fieldName)?.value;
    return (min) ? (min) : null;
  }

  getChildren = () => {
    this.leftDiv = this.leftSide.nativeElement;
    this.rightDiv = this.rightSide.nativeElement;
  };

  trackPanels = () => {
    this.leftWidth = this.leftDiv.clientWidth;
    this.rightWidth = this.rightDiv.clientWidth;
    console.log('start', this.leftWidth, this.rightWidth);
  };
  resizePanels = (event: CdkDragMove): void => {
    const xChange = event.distance.x;
    const leftWidth = this.leftWidth + xChange;
    const rightWidth = this.rightWidth - xChange;
    this.leftDiv.style.width = `${leftWidth}px`;
    this.rightDiv.style.width = `${rightWidth}px`;
    console.log(`resize: `, event);
  };

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
}
