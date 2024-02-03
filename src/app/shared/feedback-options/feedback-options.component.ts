import { CommonModule, NgFor } from '@angular/common';
import {
  AfterViewInit,
  Component, ElementRef, Input,
  OnInit, Provider, ViewChild, forwardRef, inject,
  signal
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatFormField, MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ILookupDataModel } from 'src/app/core/models/lookup-data.model';
import * as appState from '../../state/index';

const FEEDBACK_CONTROL_VALUE_ACESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FeedbackOptionsComponent),
  multi: true};

@Component({
  selector: 'mfmp-feedback-options',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule, NgFor],
  templateUrl: './feedback-options.component.html',
  styles: [],
  providers: [FEEDBACK_CONTROL_VALUE_ACESSOR]
})
export class FeedbackOptionsComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  ready = signal(false);
  store: Store = inject(Store);
  fuelFeedbackOptions!: Observable<ILookupDataModel[]>;
  control = new FormControl('');
  disabled = false;

  private onChange: Function = (value: string) => {};
  private onTouched: Function = () => {};

  @Input() placeHolder = 'Click to select.';
  @Input({required: true}) label!: string;
  @ViewChild('feedback') formField!: ElementRef<MatFormField>;

  ngOnInit(): void {
    this.fuelFeedbackOptions = this.store.select(appState.feature.selectFuelFeedbackModes);
  }

  ngAfterViewInit(): void {
    const required = this.control.hasValidator(Validators.required);
    console.log('required', required);
    this.ready.set(true);
    console.log('feedback-options form is ready');
  }

  writeValue(value: string) :void {
    this.control.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  onSelect(option: string) {
    this.onChange(option);
  }

  onFocus() {
    this.onTouched;
  }
}
