import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AppConfigService } from './config/app-config.service';
/**
 * Build out this stub as needed
 */
@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  private retryCount: number;
  private retryInterval: number;

  constructor(private configService: AppConfigService) {

    this.retryCount = configService.maxRetries;
    this.retryInterval = configService.retryDelay;

  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry({
        count: this.configService.maxRetries,
        delay: (_, retryCount) => timer(retryCount * this.retryInterval)
      }),
      catchError((err) => {
        console.warn('Error handled by ServerErrorInterceptor...');
        return throwError(() => {
          console.log('Error rethrown by ServerInterceptorError');
          return err;
        });
      })
    );
  }
}
