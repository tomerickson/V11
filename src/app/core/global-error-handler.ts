import {ErrorHandler, Injectable, Injector} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    
    constructor(private injector: Injector) {}

    handleError(error: Error | HttpErrorResponse) {
        const notifier = this.injector.get(NotificationService);
        let message: string;
        if (error instanceof HttpErrorResponse) {
            message = error.message;
            notifier.openServerErrorDialog(error.message);
        } else {
            message = error.message ? error.message : error.toString();
            notifier.showClientError(message);
        }
        console.error(message);
    }
}