import { CommonModule, NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  signal
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule
} from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { KeyValuePair } from 'src/app/core/models/key-value-pair.model';
import { ILookupDataModel } from 'src/app/core/models/lookup-data.model';
import * as appState from '../../state/index';

@Component({
  selector: 'mfmp-feedback-options',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule, NgFor],
  templateUrl: './feedback-options.component.html',
  styles: []
})
export class FeedbackOptionsComponent implements OnInit {
  ready = signal(false);
  store: Store = inject(Store);

  @Input({required: true}) parentForm!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) feedbackOptions!: ILookupDataModel[] | null;
  @Input() selected!: string | null;

  ngOnInit(): void {
    this.ready.set(true);
    console.log('feedback-options form is ready');
  }
}
