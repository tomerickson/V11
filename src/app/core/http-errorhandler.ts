/*import {
  HttpHandler,
  HttpEvent,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, throwError, Observable } from 'rxjs';

export class HttpErrorHandler implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          //* Server-side error 
          return throwError(() => error.message);
        } else {
          //* Unknown error 
          return throwError(() => error);
        }
      })
    );
  }
}
*/