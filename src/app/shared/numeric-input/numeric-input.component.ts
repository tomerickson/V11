import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { IFormError } from 'src/app/core/models/form-error.model';
import { KeyValuePair } from 'src/app/core/models/key-value-pair.model';
import { Subscription } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'mfmp-numeric-input',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    ReactiveFormsModule
  ],
  templateUrl: './numeric-input.component.html',
  styleUrls: ['./numeric-input.component.scss']
})
export class NumericInputComponent implements OnInit  {

  private _method!: 'slider' | 'text';

  @Input() min = 0;
  @Input() max: number = -1;
  @Input() step = 1;
  @Input() label = '';
  @Input() inputId = '';
  @Input({required: true, transform: () => FormControl}) control!:  FormControl;
  @Input({ required: true }) errorMessages!: Record<string, string>;

  ngOnInit(): void {
  }

  hasError = (errorName: string) => {
    return this.control.hasError(errorName);
  };
}
