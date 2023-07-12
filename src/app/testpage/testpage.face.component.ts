import { CommonModule, NgFor, AsyncPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewChildDecorator,
  inject
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { IElementDataModel } from '../core/models/element-data.model';
import { NuclidePickerComponent } from '../shared/nuclide-picker/nuclide-picker.component';
import { MatCardModule } from '@angular/material/card';
import { ILenrEventsRequest } from '../core/models/lenr-events-request.model';
import { TestpagePushComponent } from './testpage.push.component';

@Component({
  selector: 'mfmp-testpage',
  standalone: true,
  templateUrl: 'testpage.component.html',
  styleUrls: ['testpage.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    NgFor,
    ReactiveFormsModule,
    NuclidePickerComponent,
    TestpagePushComponent
  ]
})
export class TestPageFaceComponent implements OnInit, AfterViewInit, OnDestroy {

  ngOnDestroy(): void {}
  ngOnInit(): void {}
  fb = inject(FormBuilder);
  testForm!: FormGroup;
  subscriptions: Subscription = new Subscription();
  @ViewChild('f') formRef!: ElementRef
  form!: HTMLFormElement;
  @Input({ required: true }) model!: ILenrEventsRequest;
  @Input({ required: true }) elements!: IElementDataModel[] | null;
  @Input({ required: true }) html!: Observable<string>;
  @Output() action: EventEmitter<string> = new EventEmitter<string>();

  ngAfterViewInit(): void {
    this.form = this.formRef.nativeElement as HTMLFormElement;
  }

  postit = (action: string) => {
    if (action === 'initialize') {
    this.action.emit(action);}
    else {
      this.action.emit(action)
    }
  };
}
