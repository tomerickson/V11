import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

/**
 * Confirm that there are elements selected
 * before submitting
 * @param control
 * @returns
 */
export const twoupElementsValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const leftElements: string[] = control.get('leftNuclides')?.get('selectedElements')?.value || [];
  const rightElements: string[] = control.get('rightNuclides')?.get('selectedElements')?.value || [];
  const error = (leftElements.length === 0 && rightElements.length === 0);
  return (error) ? { missingElements: true } : null;
};
