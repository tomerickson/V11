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
import { CustomPaginatorComponent } from '../shared/custom-paginator/custom-paginator.component';
import { PageNavigator } from '../shared/models/page-navigator';

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
    CustomPaginatorComponent
  ]
})
export class TestPageFaceComponent {

  fb = inject(FormBuilder);
  testForm!: FormGroup;
  subscriptions: Subscription = new Subscription();
  @Input({ required: true }) rows!: number | undefined;
  @Output() action: EventEmitter<string> = new EventEmitter<string>();

  handlePageEvent(e: any) {
    console.log('e', e as PageNavigator);
  }
}
