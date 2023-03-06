import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    
    constructor(@Inject(NotificationService) private notifier: NotificationService) {}

    handleError(error: unknown) {

        let message: string;
        if (error instanceof HttpErrorResponse) {
            message = error.message;
            this.notifier.openServerErrorDialog(error.message);
        } else if (error instanceof Error) {
            message = error.message ? error.message : error.toString();
            console.error(message);
            this.notifier.showClientError(message);
        } else {
            console.warn(`${error} is not an Error, and should not be handled by Custom Error Handler`)
        }
    }
}