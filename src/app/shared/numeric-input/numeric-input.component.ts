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
      useExisting: FormGroupDirective
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
  readonly decimalPattern = '\\d+(?:\\.\\d+){0,1}';
  readonly integerPattern = '\\d+';
  chosenPattern!: string;
  customControl!: FormControl;
  errorMessages: Record<string, string>[] = [];
  numericErrorMessages!: Record<string, string>;

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit(): void {
    this.chosenPattern =
      this.type === 'integer' ? this.integerPattern : this.decimalPattern;
    this.customControl = new FormControl(this.value, [
      Validators.required,
      Validators.pattern(this.chosenPattern),
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
    const rangeMessage = `Out of range. Please enter values within the range ${this.min} through ${this.max}.`;
    this.numericErrorMessages = {
      required: 'This field is required.',
      pattern: 'Digits [0-9] only.',
      min: rangeMessage,
      max: rangeMessage
    };
  }

  getErrorMessages = (): string | undefined => {
    const ctl = this.customControl;
    if (ctl.hasError('required')) {
      return this.numericErrorMessages['required'];
    }
    if (ctl.hasError('pattern'))  {
      return this.numericErrorMessages['pattern'];
    }
    if (ctl.hasError('min')) {
      return this.numericErrorMessages['min'];
    }
    if (ctl.hasError('max')) {
      return this.numericErrorMessages['max'];
    }
    return;
  }
}
