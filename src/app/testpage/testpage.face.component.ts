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
  ValidationErrors,
  Validators
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { FeedbackOptionsComponent } from '../shared/feedback-options/feedback-options.component';

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
    MatInputModule,
    FeedbackOptionsComponent
  ],
})
export class TestPageFaceComponent implements OnInit, AfterViewInit, OnDestroy {
  // model!: {key: string, value: number}[]

  form!: FormGroup;
  subscriptions: Subscription;
  ready = signal(false);

  /**
   * Form control getters
   * */

  constructor(private fb: FormBuilder) {
    this.subscriptions = new Subscription();
  }

  ngAfterViewInit(): void {
    this.ready.set(true);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      dimersSwitch: new FormControl('Include', Validators.required)
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

  getControl = (controlKey: string): FormControl => {
    return this.form.controls[controlKey] as FormControl;
  };

  getErrors = (controlKey: string): any => {
    const control = this.getControl(controlKey) as AbstractControl;
    console.log('control', control);
    return control.errors;
  };
  }
