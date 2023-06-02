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
  export const downloadFormValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const fileType: number | null = control.get('fileType')?.value;
    const fileName: string | null = control.get('fileName')?.value;
    const error = (!fileType || !fileName);
    console.log('downloadValidator: ', error)
    return (error) ? { missingElements: true } : null;
  };
  