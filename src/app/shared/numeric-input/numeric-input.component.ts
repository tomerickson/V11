import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
  signal
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NG_VALIDATORS,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'mfmp-numeric-input',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
      // useFactory: () => inject(ControlContainer, { skipSelf: true })
    },
    {
      provide: NG_VALIDATORS,
      useExisting: NumericInputComponent,
      multi: true
    }
  ],
  templateUrl: './numeric-input.component.html',
  styleUrls: ['./numeric-input.component.scss']
})
export class NumericInputComponent implements OnInit, AfterViewInit, OnDestroy {
  parentContainer = inject(ControlContainer);

  @Input() min = 0;
  @Input() max = 0;
  @Input() step = 1;
  @Input() value!: number | null;
  @Input() label = '';
  @Input() required = true;
  @Input() type: 'decimal' | 'integer' = 'integer';
  @Input({ required: true }) controlKey!: string;

  errors = false;
  ready = signal(false);
  decimalPattern!: RegExp;
  integerPattern!: RegExp;
  customControl!: FormControl;
  errorMessages: Record<string, string>[] = [];
  numericErrorMessages: Record<string, string> = {
    required: 'This field is required.',
    pattern: 'Digits [0-9] only.',
    range: `Out of range. Please enter values within the range ${this.min} through ${this.max}.`
  };

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
  // subscriptions: Subscription;

  constructor() {
    this.decimalPattern = /^\d+?(?:\.\d+?)$/;
    this.integerPattern = /^\d+$/;
  }

  ngOnInit(): void {
    this.customControl = new FormControl(this.value, [
      Validators.required,
      Validators.pattern(
        this.type === 'integer' ? this.integerPattern : this.decimalPattern
      ),
      Validators.min(this.min),
      Validators.max(this.max)
    ]);
    this.buildErrorMessaages();
    this.parentFormGroup.addControl(this.controlKey, this.customControl);
    this.parentFormGroup.controls[this.controlKey].updateValueAndValidity();
    this.ready.set(true);
  }

  ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.controlKey);
  }

  ngAfterViewInit(): void {

    console.log('numeric-input form is ready');
  }

  buildErrorMessaages() {
    if (this.type === 'integer')
      this.errorMessages.push({ key: 'pattern', value: 'Digits [0-9] only.' });
    if (this.type === 'decimal')
      this.errorMessages.push({
        key: 'pattern',
        value: 'Digits and decimal point only'
      });
    if (this.required)
      this.errorMessages.push({
        key: 'required',
        value: 'This field is required.'
      });
    this.errorMessages.push({
      key: 'min',
      value: `Minimum value is ${this.min}.`
    });
    this.errorMessages.push({
      key: 'max',
      value: `Maximum value is ${this.max}`
    });
  }
}
