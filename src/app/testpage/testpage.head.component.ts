import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MyTelInput } from '../shared/custom/form-field-custom-control-example';
@Component({
    selector: 'mfmp-testpage',
    imports: [CommonModule, ReactiveFormsModule, MyTelInput],
    template: `<example-tel-input placeholder=""></example-tel-input>
  `,
    styleUrls: []
})
export class TestpageHeadComponent {
  formGroup = this.fb.group({
    counter: 0,
    options: ['Core',[Validators.required]]
  });

  get options(): FormControl {
    return this.formGroup.get('options') as FormControl;
  }

  constructor(private fb: FormBuilder) {}
}
