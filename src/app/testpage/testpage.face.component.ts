import { CommonModule, NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CustomPaginatorComponent } from '../shared/custom-paginator/custom-paginator.component';
import { PageNavigator } from '../shared/models/page-navigator';
import { NuclidePickerComponent } from '../shared/nuclide-picker/nuclide-picker.component';

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
