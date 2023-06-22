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
export const fissionElementsValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const elements: string[] = control.get('nuclides')?.get('selectedElements')?.value || [];

  const error = (elements.length === 0);
  return (error) ? { missingElements: true } : null;
};
