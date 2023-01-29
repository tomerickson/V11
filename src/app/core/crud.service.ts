import {
  HttpClient,
  HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: number;
}

export interface dummy {
  client: HttpClient;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class CrudService {
  private httpError: any;
  private header: HttpHeaders;
  private options;

  private _endPoint: string = environment.proxy + environment.apiUrl;
  private user: User;

  public get endPoint(): string {
    return this._endPoint;
  }

  constructor(private http: HttpClient) {
    this.user = <User>{ id: '' };
    this.header = new HttpHeaders({ Accept: 'text/html' });
    this.header.append('Content-Type', 'text/html');
    // this.options = {headers: this.header, observe: 'body'};
    this.options = {
      headers: this.header,
      observe: 'response',
      responseType: 'text'
    };
  }

  getUsers(): Observable<User> {
    return this.http
      .get<User>(this.endPoint + '/users')
      .pipe(retry(1), catchError(this.httpError));
  }

  getFusionResults(): Observable<ArrayBuffer> {
    let page = `${this.endPoint}Fusion.php`;
    return this.http.get<ArrayBuffer>(page, {observe: 'body', headers: this.header});
    return this.http.post<ArrayBuffer>(page, null, {
      headers: this.header,
      observe: 'body'
    });
    // .pipe(retry(1), this.handleError(this.httpError));
    /*       .pipe(retry(1),
      tap(res => {
        return console.log('getting fusion results', res);
      }),
       catchError(this.handleError<any>('getFusionResults'))); */
  }

  getUser(id: string): Observable<User> {
    return this.http
      .get<User>(`${this.endPoint}/users/${id}`)
      .pipe(retry(1), this.handleError(this.httpError));
  }
  /*
  create(employee): Observable<User> {
    return this.http.post<User>(this.endPoint + '/users', JSON.stringify(employee), this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }  ;

  update(id, data): Observable<User> {
    return this.http.put<User>(this.endPoint + '/users/' + id, JSON.stringify(data), this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }

  delete(id){
    return this.http.delete<User>(this.endPoint + '/users/' + id, this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }

  httpError(error) {
    let msg = '';
    if(error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(operation); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`CrudService: ${message}`);
  }
}
