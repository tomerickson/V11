import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

/**
 * Confirm that there are elements selected in both nuclide pickers
 * before submitting
 * @param control
 * @returns
 */
export const elementsSelectedValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const fusionForm = control as FormGroup;
  const leftElements: string[] = control.get('leftNuclides.selectedElements')?.value;
  const rightElements: string[] = control.get('rightNuclides.selectedElements')?.value;
  const name = control.get('name');
  const alterEgo = control.get('alterEgo');

  return leftElements.length > 0 && rightElements.length > 0
    ? { missingElements: true }
    : null;
};
