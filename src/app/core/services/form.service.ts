import { Injectable } from '@angular/core';
import {
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {
  INumericFormControlContext,
  NumericFormControlContext,
  NumericInputTypes
} from '../models/numeric-formcontrol-context';

/** Service for building reqctive form controls */
@Injectable()
export class FormService {
  buildNumericFormControl = (
    context: INumericFormControlContext
  ): FormControl => {
    const control = new FormControl(context.value, { updateOn: 'change' });
    const validators = this.composeNumericValidators(context);
    control.setValidators(validators);
    return control;
  };

  composeNumericValidators = (
    context: INumericFormControlContext
  ): ValidatorFn[] => {
    const validators: ValidatorFn[] = [];
    if (context.required) {
      validators.push(Validators.required);
    }
    if (context.min) {
      validators.push(Validators.min(context.min));
    }
    if (context.max) {
      validators.push(Validators.max(context.max));
    }
    if (context.type === NumericInputTypes.decimal) {
      validators.push(Validators.pattern(/^\d+?$/));
    } else {
      validators.push(Validators.pattern(/^\d+(?:\.\d*)?$/));
    }
    return validators;
  };

  /**
   * Return error messages customized for the new control
   * @param context
   * @returns Map of error messages keyed by validator name
   */
  buildErrorMessaages = (
    context: INumericFormControlContext
  ): ValidationErrors => {
    const result: ValidationErrors = {};
    if (context.required) {
      result['required'] = 'This field is required';
    }
    if (context.min) {
      result['min'] = `Minimum is ${context.min}`;
    }
    if (context.max) {
      result['max'] = `Maximum is ${context.max}`;
    }
    result['pattern'] =
      context.type === NumericInputTypes.decimal ? 'nnn.nn' : 'nnnn';
    return result;
  };
}
