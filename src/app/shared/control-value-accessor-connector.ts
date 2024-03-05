import {AbstractControl, ControlContainer, ControlValueAccessor, FormControl, FormControlDirective} from '@angular/forms';
import {Injectable, Injector, Input, ViewChild} from '@angular/core';

@Injectable()
export class ControlValueAccessorConnector implements ControlValueAccessor {
  @ViewChild(FormControlDirective, {static: true})
  formControlDirective!: FormControlDirective;

  /**
   * This directive should be able to handle either a FormControl input
   * or a formControlName.  Until issue is fixed, we're limited to
   * FormControl inputs.
   *     // See angular issue #48350
   */

  private _formControl!: FormControl;
  private _formControlName!: string;

  @Input({required: true}) set formControlName(name: string) {
    this._formControlName = name;
    this.formControl = this.controlContainer.control?.get(name) as FormControl;
  }
  get formControlName(): string {
    return this._formControlName;
  }

  set formControl(obj: FormControl) {
    this._formControl = obj;
  }
  get formControl(): FormControl {
    return this._formControl;
  }
  
  get control() {
    return this.formControl;// || this.controlContainer.control?.get(this.formControlName);;
  }

  constructor(private injector: Injector) {
  }

  get controlContainer() {
    return this.injector?.get(ControlContainer);
  }

  registerOnTouched(fn: any): void {
    this.formControlDirective.valueAccessor?.registerOnTouched(fn);
  }

  registerOnChange(fn: any): void {
    this.formControlDirective.valueAccessor?.registerOnChange(fn);
  }

  writeValue(obj: any): void {
    this.formControlDirective.valueAccessor?.writeValue(obj);
  }

  setDisabledState(isDisabled: boolean): void {

    // See angular issue #48350
    //@ts-expect-error
    this.formControlDirective.valueAccessor?.setDisabledState(isDisabled);
    }
  }
