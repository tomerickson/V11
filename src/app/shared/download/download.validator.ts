import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { Downloadable } from 'src/app/core/models/downloadable.model';

/**
 * Confirm that file name and extension are valid
 * before submitting
 * @param control
 * @returns
 */
export const downloadFormValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const fileType: Downloadable | null = control.get('fileType')?.value || null;
  const fileName: string | null = control.get('fileName')?.value;
  const ok: boolean =
    fileType !== null && fileName !== null && fileName.length > 0;
  return ok ? null : { missingElements: true };
};
