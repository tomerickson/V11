import { CommonModule, NgFor } from '@angular/common';
import {
  AfterContentInit,
  Component,
  Input,
  OnInit,
  inject,
  signal
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ILookupDataModel } from 'src/app/core/models/lookup-data.model';
import * as appState from '../../state/index';

@Component({
  selector: 'mfmp-feedback-options',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule, NgFor],
  templateUrl: './feedback-options.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FeedbackOptionsComponent,
      multi: true
    }
  ]
})
export class FeedbackOptionsComponent
  implements ControlValueAccessor, OnInit, AfterContentInit
{

  form!: FormGroup;
  ready = signal(false);
  store: Store = inject(Store);
  fuelFeedbackOptions!: Observable<ILookupDataModel[]>;

  get value(): string {
    return this.form.get('control')?.value;
  }
  set value(val: string) {
    this.form.get('control')?.patchValue(val);
    this.onChange();
    this.onTouch();
  }

  get control(): FormControl {
    return this.form.get('control') as FormControl;
  }

  set control(obj: FormControl) {
    this.form.controls['control'] = obj;
  }

  @Input() placeHolder = 'Click to select.';
  @Input({ required: true }) label!: string;

  /**
   * ControlValueAccessor
   */
  onChange: any = () => {};
  onTouch: any = () => {};
  disabled!: boolean;

  registerOnTouched(fn: any): void {
    this.registerOnTouched(fn);
  }

  registerOnChange(fn: any): void {
    this.registerOnChange(fn);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  setDisabledState(isDisabled: boolean): void {
    this.setDisabledState(isDisabled);
  }
/**
 *  end ControlValueAccessor
 *  */


  // val = ''; // this is the updated value that the class accesses
  // set value(val: string) {
  //   // this value is updated by programmatic changes
  //   if (val !== undefined && this.val !== val) {
  //     this.val = val;
  //     this.onChange(val);
  //     this.onTouch(val);
  //   }
  // }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({control: ''});

    this.fuelFeedbackOptions = this.store.select(
      appState.feature.selectFuelFeedbackModes
    );
  }

  ngAfterContentInit(): void {
    const required = this.control?.hasValidator(Validators.required);
    console.log('required', required);
    this.ready.set(true);
    console.log('feedback-options form is ready');
  }

  valueChange(v: string) {
    this.onChange(v);
  }

  touchedChange(v: boolean) {
    this.onTouch(v);
  }

  onSelect(option: string) {
    this.writeValue(option);
  }
}
