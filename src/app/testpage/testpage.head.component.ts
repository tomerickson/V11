import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'mfmp-testpage',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCardModule],
  template: `
    <mat-card class="fullheight">
      <mat-card-content>Content</mat-card-content>
      <mat-card-actions align="end">
        <div>
          <button mat-raised-button>Action</button>
        </div>
      </mat-card-actions>
    </mat-card>
  `,
  styles: `
    .fullheight {
      bottom: 0;
      right: 0;
    }
    .bottom-dock {
      bottom: 5;
      right: 5;
    }
  `
})
export class TestpageHeadComponent {
  formGroup = this.fb.group({
    counter: 0,
    options: ['Core', [Validators.required]]
  });

  get options(): FormControl {
    return this.formGroup.get('options') as FormControl;
  }

  constructor(private fb: FormBuilder) {}
}
