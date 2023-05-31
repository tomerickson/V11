import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [MatDialogModule, MatIconModule],
  selector: 'error-handler-dialog',
  styles: [
    `
      .mat-dialog-title {
        display: flex;
        align-items: center;
      }

      mat-dialog-content {
        text-align: center;
      }

      #error-btn {
        background-color: red;
        color: white;
      }
    `
  ],
  template: `
    <h1 mat-dialog-title><mat-icon color="alert">priority_high</mat-icon>{{ title }}</h1>
    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button id="error-btn" mat-raised-button mat-dialog-close>Okay</button>
    </mat-dialog-actions>
  `,
  standalone: true
})
export class ErrorHandlerDialogComponent {
  public title = 'Network Error';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
