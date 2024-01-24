import { FocusMonitor } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { isIdentifier } from '@angular/compiler';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  inject,
  signal
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  DefaultValueAccessor,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject } from 'rxjs';
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
  providers: [
    {provide: MatFormFieldControl,
      useExisting: NumericInputComponent
    },
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}.
  ],
  templateUrl: './numeric-input.component.html',
  styleUrl: './numeric-input.component.scss'
})
export class NumericInputComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnDestroy {

  private _value!: FormFieldValue;
  stateChanges = new Subject<void>();

  @Input() min!: number | null;
  @Input() max!: number | null;
  @Input() step!: number | null;
  @Input() disabled = false;
  @Input() required = true;
  @Input() type: 'decimal' | 'integer' = 'integer';
  @Input({ required: true }) controlKey!: string;
  @Input({ required: true }) label = '';
  @Input()
  set value(value: FormFieldValue) {
    this._value = value;
    this.stateChanges.next();
  }
  get value() {
    return this._value;
  }
  ready = signal(false);
  errors = false;
  disabled = false;
  placeholder!: string;
  customControl!: FormControl;
  errorMessages!: Record<string, string>;

  onChange!: (value: FormFieldValue) => void;
  onTouch!: () => void;

  constructor(private focusMonitor: FocusMonitor, @Optional() @Self() public ngControl: NgControl)
  {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  writeValue(obj: FormFieldValue): void {
    this.value = obj;
  }

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
