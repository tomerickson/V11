import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Self,
  ViewChild,
  signal
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldControl
} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Observable, Subject } from 'rxjs';
import { ILookupDataModel } from 'src/app/core/models/lookup-data.model';

/** Custom `MatFormFieldControl` for telephone number input. */
@Component({
  selector: 'mfmp-custom',
  template: `
  @if(ready()) {
  <div role="group" class="feedback-options-container"
     [formGroup]="feedbackForm"
     [attr.aria-labelledby]="parentFormField.getLabelId()"
     (focusin)="onFocusIn($event)"
     (focusout)="onFocusOut($event)">
     <mat-select #feedback class="feedback-options-select" formControlName="feedback">
     @for (option of (this.fuelFeedbackOptions | async); track option) {
      <mat-option [value]="option.code" (click)="onSelect(option.code)">{{option.description}}</mat-option>
    }
  </mat-select>
</div>
  }
`,
  styleUrl: 'custom.component.scss',
  providers: [{ provide: MatFormFieldControl, useExisting: CustomComponent }],
  host: {
    '[class.feedbackoptions-floating]': 'shouldLabelFloat',
    '[id]': 'id'
  },
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatSelectModule]
})
export class CustomComponent
  implements ControlValueAccessor, MatFormFieldControl<string>, AfterViewInit, OnDestroy
{
  static nextId = 0;
  @ViewChild('feedback') feedbackInput!: HTMLSelectElement;

  fuelFeedbackOptions!: Observable<ILookupDataModel[]>;
  feedbackForm!: FormGroup<{feedback: FormControl<string | null>;}>;
  stateChanges = new Subject<void>();
  focused = false;
  touched = false;
  controlType = 'feedback-options';
  id = `feedback-options-${CustomComponent.nextId++}`;
  ready = signal(false);
  onChange = (_: any) => {};
  onTouched = () => {};

  get empty() {
    return !this.feedbackForm.get('feedback')?.value;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input({required: true}) label!: string;
  @Input('aria-describedby') userAriaDescribedBy!: string;

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder!: string;

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.feedbackForm.disable() : this.feedbackForm.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): string | null {
    if (this.feedbackForm.valid) {
      return this.feedbackForm.get('feedback')?.value || null;
    }
    return null;
  }
  set value(feed: string | null) {
    this.feedbackForm.setValue({feedback: feed});
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.feedbackForm.invalid && this.touched;
  }

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl,
    @Optional() public parentFormField: MatFormField
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.feedbackForm = formBuilder.group({
      feedback: ['', [Validators.required]]
    });
  }
  autofilled?: boolean | undefined;

  ngAfterViewInit(): void {
    this.ready.set(true);
  }


  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (
      !this._elementRef.nativeElement.contains(event.relatedTarget as Element)
    ) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }

  autoFocusNext(
    control: AbstractControl,
    nextElement?: HTMLInputElement
  ): void {
    if (!control.errors && nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.example-tel-input-container'
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    if (this.feedbackForm.controls.feedback.valid) {
      this._focusMonitor.focusVia(this.feedbackInput, 'program');
    }
  }

  onSelect(value: string) {
    this.writeValue(value);
  }

  writeValue(value: string | null): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }
}
