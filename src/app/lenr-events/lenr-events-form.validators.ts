import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

/**
 * Confirm that there are elements selected
 * before submitting
 * @param control
 * @returns
 */
export const yearRangeValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const fromControl = control.get('s_Year_from');
  const toControl = control.get('s_Year_to');
  const fromYear = fromControl?.value;
  const toYear = toControl?.value;
  return fromYear && toYear && fromYear > toYear
    ? { yearRangeError: true }
    : null;
};

export const indexRangeValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const fromControl = control.get('s_Index_from');
  const toControl = control.get('s_Index_to');
  const fromIndex = fromControl?.value;
  const toIndex = toControl?.value;
  return fromIndex && toIndex && fromIndex > toIndex
    ? { indexRangeError: true }
    : null;
};
