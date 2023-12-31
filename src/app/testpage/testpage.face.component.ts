import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';
import {
  INumericFormControlContext,
  NumericFormControlContext,
  NumericInputTypes
} from '../core/models/numeric-formcontrol-context';
import { FormService } from '../core/services/form.service';
import { SliderLayout } from '../shared/slider-input';
@Component({
  selector: 'mfmp-testpage',
  standalone: true,
  templateUrl: 'testpage.component.html',
  styleUrls: ['testpage.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [{ provide: FormService, useClass: FormService }]
})
export class TestPageFaceComponent implements OnInit, AfterViewInit, OnDestroy {
  // model!: {key: string, value: number}[]
  layout: SliderLayout = 'row';
  elements = 'vsl';
  form!: FormGroup;
  subscriptions: Subscription;
  ready = signal(false);
  service = inject(FormService);

  /**
   * Context guards for numeric input controls
   */
  numericInputContextGuards: Map<string, NumericFormControlContext> = new Map<
    string,
    NumericFormControlContext
  >();

  /**
   * Form control getters
   * */

  get maxNuclei() {
    return this.form.get('maxNuclei');
  }
  /*   public maxNucleiContext: NumericFormControlContext = {
    min: 1,
    max: 100,
    step: 1,
    value: 34,
    label: 'Max. Nuclei',
    required: true,
    type: NumericInputTypes.integer,
    controlKey: 'maxNuclei'
  }; */

  constructor(private fb: FormBuilder) {
    this.subscriptions = new Subscription();
    this.numericInputContextGuards.set(
      'maxNuclei',
      new NumericFormControlContext({
        min: 1,
        max: 100,
        step: 1,
        value: 10,
        label: 'Max. Nuclei',
        required: true,
        type: NumericInputTypes.integer,
        controlKey: 'maxNuclei',
        errorMessages: null
      })
    );
  }

  ngAfterViewInit(): void {
    this.ready.set(true);
  }

  ngOnInit(): void {
    let context = this.getContext('maxNuclei');
    this.form = this.fb.group({
      myControl: 34,
      maxNuclei: this.service.buildNumericFormControl(context)
    });
  }

  showError(controlName: string, errorCode: string): any | false {
    let result = false;
    let errors = this.form.get(controlName)?.errors;
    if (errors) {
      result = errors[errorCode];
    }
    return result;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getContext = (controlKey: string): INumericFormControlContext => {
    const context = this.numericInputContextGuards.get(controlKey);
    if (!context) {
      throw `${controlKey} is not a valid control name.`;
    }
    return context;
  };

  getControl = (controlKey: string): FormControl => {
    return this.form.controls[controlKey] as FormControl;
  };

  getErrors = (controlKey: string): any => {
    const control = this.getControl(controlKey) as AbstractControl;
    console.log('control', control);
    return control.errors;
 /*    let list: string[] = [];
    if (control.errors) {
      Object.keys(control.errors).map((error) => {
        list.push(error);
      });
    }
    return list; */
  };

  setElements(event: Event) {
    const ctl = event.target as HTMLInputElement;
    const vlu = ctl.value;
    this.elements = vlu;
  }

  buildFormControl = {};
}
