import { HttpHandlerFn, HttpRequest, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { config } from 'src/assets/config';

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.table(req);
  return next(req).pipe(tap(event => {
    if (event.type === HttpEventType.Response) {
      req.headers.set('Access-Control-Allow-Origin','*');
      console.log(req.url, 'returned a response with status', event.status);
      console.table(req.headers);
    }
  }));
}

export function corsInterceptor (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>>
{
  console.log(`req.method: ${req.method}, req.url: ${req.url}`);
  if (req.method === 'GET' || req.method === 'OPTION') {
     const modifiedReq = req.clone({
      headers: req.headers.set('Access-Control-Allow-Origin', '*')});
     console.table(modifiedReq.headers);
     const result = next(modifiedReq);
     return result;
    } else {
      return next(req);
    }
};
