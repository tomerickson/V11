import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
export class NumericInputComponent implements OnInit {
  @Input() minimum = 0;
  @Input() maximum: number = -1;
  @Input() step = 1;
  @Input({ required: true }) default!: number;
  @Input() label = '';
  @Input() inputId = '';
  @Input({ required: true }) parentForm!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) errorMessages!: Record<string, string>;

  ready = signal(false);
  form!: FormGroup;
  numberPattern!: RegExp;
  // subscriptions: Subscription;

  constructor() {
    this.numberPattern = /^\d+?(?:\.\d+?)*$/; // Numeric with optional decimals
  }
  ngOnInit(): void {
    // this.form = this.fgd.control;
    this.ready.set(true);
    console.log('numeric-input form is ready');
  }

  /*   buildForm = (): void => {
    this.form = this.fb.group({
      numValue: new FormControl<number>(this.default, [
        Validators.required,
        Validators.pattern(this.numberPattern),
        Validators.min(this.minimum),
        Validators.max(this.maximum)
      ])
    });
    this.form.valueChanges.subscribe((changes) => this.handleValueChanges());
  };

  handleValueChanges = () => {
    if (this.form.valid && this.form.dirty) {
      console.log('form:', this.form);
      this.value = this.form.get('numValue')?.value;
    }
  }; */
}
