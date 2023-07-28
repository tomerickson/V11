import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { IFormError } from 'src/app/core/models/form-error.model';
import { KeyValuePair } from 'src/app/core/models/key-value-pair.model';
import { Subscription } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'mfmp-numeric-input',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    ReactiveFormsModule
  ],
  templateUrl: './numeric-input.component.html',
  styleUrls: ['./numeric-input.component.scss']
})
export class NumericInputComponent implements OnInit, AfterViewInit, OnDestroy {
  cdr = inject(ChangeDetectorRef);

  private _method!: 'slider' | 'text';

  @Input({ required: true }) set method(value: 'slider' | 'text') {
    this._method = value;
    // this.toggleControls();
  }
  get method() {
    return this._method;
  }
  @Input() min: number = 0;
  @Input({ required: true }) max!: number;
  @Input() step: number = 0;
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) errorMessages!: IFormError[];
  @Input({ required: true }) initialValue!: number;
  @Input() label!: string;
  @Output() changes: EventEmitter<KeyValuePair> = new EventEmitter();
  @ViewChild('prompt') inputRef!: ElementRef<HTMLInputElement>;

  subscriptions: Subscription = new Subscription();

  /**
   *  used for slider
   */
  value = signal(0);

  /**
   * used for text input
   */
  input!: HTMLInputElement;
 
  form!: FormGroup;
/*   form: FormGroup = new FormGroup({
    numValue: new FormControl(this.initialValue, [
      Validators.required,
      Validators.pattern('[0-9]+')
    ])
  }); */

  get numValue(): number {
    return this.form.get('numValue')?.value;
  }

  get currentValue() {
    return this.form.get('numValue')?.value;
  }

  ngOnInit(): void {
    this.buildForm();
    this.value.set(this.initialValue);
    this.form.get('numValue')?.setValue(this.value);
/*     this.subscriptions.add(
      this.form.valueChanges.subscribe((changes) =>
        this.showFormChanges(changes)
      )
    ); */
  }

  ngAfterViewInit(): void {
    this.input = this.inputRef.nativeElement;
    this.toggleControls();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  buildForm = () => {
    this.form = new FormGroup({
      numValue: new FormControl(this.initialValue, [
        Validators.required,
        Validators.pattern('[0-9]+')
      ])
    });
  };

  showFormChanges(changes: any) {
  }

  toggleControls() {
    if (this.method === 'slider') {
    } else {
      this.form.get('numValue')?.setValue(this.value(), { emitEvent: true });
    }
  }

  updateValueFromInput(event: Event): void {
    const elm: HTMLInputElement = event.target as HTMLInputElement;
    this.form.get('numValue')?.setValue(elm.value, { emitEvent: true });
    if (this.form.get('numValue')?.valid) {
      this.value.set(+elm.value);
      this.changes.emit(
        new KeyValuePair({ key: this.controlName, value: elm.value })
      );
    }
    this.cdr.detectChanges();
  }

  updateValueFromSlider(value: number) {
    this.value.set(value);
    this.input.value = String(value);
    this.form.get('numValue')?.setValue(value, { emitEvent: true });

    this.changes.emit(
      new KeyValuePair({ key: this.controlName, value: value })
    );
    this.cdr.detectChanges();
  }
  hasError = (errorName: string) => {
    return this.form.get('numValue')?.hasError(errorName);
  };

  /**
   * Look for a matching error message:
   *
   */
  getErrorMessage = (controlName: string, errorName: string): string => {
    const errs = this.errorMessages
      .filter(
        (msg) =>
          (msg.control === controlName || msg.control === '*') &&
          msg.error === errorName
      )
      .sort((a, b) =>
        a.control < b.control ? 1 : a.control > b.control ? -1 : 0
      );
    return errs[0].message;
  };
}
