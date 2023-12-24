import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
  assertPlatform,
  signal
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors
} from '@angular/forms';
import {
  MatFormField,
  MatFormFieldControl,
  MatFormFieldModule
} from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'mfmp-numeric-input',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './numeric-input.component.html',
  styleUrls: ['./numeric-input.component.scss']
})
export class NumericInputComponent implements AfterViewInit {
  @Input() minimum = 0;
  @Input() maximum: number = -1;
  @Input() step = 1;
  @Input({ required: true }) default!: number;
  @Input() label = '';
  @Input() inputId = '';
  @Input({ required: true }) parentForm!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) errorMessages!: Record<string, string>;
  @ViewChild('input', {static: false}) control!: FormControl;

  errors = false;
  ready = signal(false);
  numberPattern!: RegExp;

  // subscriptions: Subscription;

  constructor() {
    this.numberPattern = /^\d+?(?:\.\d+?)*$/; // Numeric with optional decimals
  }

  ngAfterViewInit(): void {
    this.ready.set(true);
    console.log('numeric-input form is ready');
  }

  showErrors = (): ValidationErrors | null => {
    const control = this.parentForm.controls[this.controlName];
    return control.errors;
  };

  handleChange(event: any) {
    const control: FormControl<number> = this.parentForm.controls[
      this.controlName
    ] as FormControl<number>;
    this.errors = control.errors ? true : false;
  }
}
