import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
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
  ValidatorFn,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NumericInputTypes } from 'src/app/core/models/numeric-formcontrol-context';

export interface INumericInputParameters {
  min: number | null;
  max: number | null;
  step: number | null;
  value: number | null;
  label: string;
  required: boolean;
  type: NumericInputTypes;
  controlKey: string;
}
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
      useExisting: FormGroupDirective
    },
    {
      provide: NG_VALIDATORS,
      useExisting: NumericInputComponent,
      multi: true
    }
  ],
  templateUrl: './numeric-input.component.html',
  styleUrl: './numeric-input.component.scss'
})
export class NumericInputComponent implements OnInit, AfterViewInit, OnDestroy {
  parentContainer = inject(ControlContainer);

  @Input() min!: number | null;
  @Input() max!: number | null;
  @Input() step!: number | null;
  @Input() value!: number | null;
  @Input() required = true;
  @Input() type: 'decimal' | 'integer' = 'integer';
  @Input({ required: true }) controlKey!: string;
  @Input({ required: true }) label = '';

  ready = signal(false);
  errors = false;
  placeholder!: string;
  customControl!: FormControl;
  errorMessages!: Record<string, string>;

  constructor() {}

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit(): void {
    this.placeholder =
      this.type === 'integer'
        ? 'digits 0-9 only'
        : 'digits 0-9 or decimal point';
    this.customControl = new FormControl(this.value, {
      validators: this.composeValidators(),
      updateOn: 'change'
    });
    this.customControl.markAsTouched();
    this.buildErrorMessaages();
    this.parentFormGroup.addControl(this.controlKey, this.customControl);
    this.parentFormGroup.controls[this.controlKey].updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.controlKey);
  }

  ngAfterViewInit(): void {
    this.ready.set(true);
  }

  composeValidators = (): ValidatorFn[] => {
    const validators: ValidatorFn[] = [];
    if (this.required) {
      validators.push(Validators.required);
    }
    if (this.min) {
      validators.push(Validators.min(this.min));
    }
    if (this.max) {
      validators.push(Validators.max(this.max));
    }
    return validators;
  };

  buildErrorMessaages() {
    this.errorMessages = {
      required: 'This field is required.',
      pattern: 'Digits [0-9] only.',
      min: `Min value: ${this.min}.`,
      max: `Max value: ${this.max}.`
    };
  }
}
