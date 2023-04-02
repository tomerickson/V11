import { Component, NgZone, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorHandlerDialogComponent } from './error-handler-dialog.component';

@Component({
  standalone: true,
  imports: [
ErrorHandlerDialogComponent],
  template: ``
})

export class NotificationComponent {

  zone = inject(NgZone);
  snackbar = inject(MatSnackBar);
  dialog = inject(MatDialog);
  
  showClientError(message: string, prompt?: string): void {
    // The snackbar or dialog won't run outside the Angular's zone.
    // Wrapping it in the run method fixes this issue.

    this.zone.run(() => {
      let action = (prompt) ? prompt : 'Close';
      this.snackbar.open(`Error: ${message}`, `${action}`, {
        duration: 10000,
        panelClass: ['error-snack'] // add a class to snackbar to add custom styles
      });
    });
  }

  showServerErrorDialog(message: string) {
    this.zone.run(() => {
      this.dialog.open(ErrorHandlerDialogComponent, {
        data: { message }
      })
    });
  }

  showNonErrorSnackBar(message: string, duration = 6000) {
    this.zone.run(() => {
      this.snackbar.open(message, 'Okay', {
        panelClass: ['non-error-snack'],
        duration
      });
    });
  }
}
