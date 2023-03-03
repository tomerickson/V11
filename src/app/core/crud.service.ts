import {
  HttpClient,
  HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IElementDataModel } from './element.data.model';

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
  private _endPoint: string = environment.proxy + environment.apiUrl;
  private user: User;

  public get endPoint(): string {
    return this._endPoint;
  }

  constructor(private http: HttpClient) {
    this.user = <User>{ id: '' };
  }

  getUsers(): Observable<User> {
    return this.http
      .get<User>(this.endPoint + '/users')
      .pipe(retry(1));
  }

  getElements(): Observable<IElementDataModel[]> {
    let page = `${this.endPoint}Elements.php`;
    return this.http.get<IElementDataModel[]>(page)
    .pipe(retry(1));
  }
  
  getFusionResults(): Observable<string> {

    let page: string = `${this.endPoint}Fusion.php`;
    return this.http.get(page, {responseType: 'text'})
    .pipe(retry(1));
    // .pipe(retry(1),catchError(this.httpError));
    // return this.http.post<string>(page, null, this.optionsObject);
    // .pipe((rsp: any) => rsp.body);
    // return this.http.post<string>(page, '', this.options);
    // .pipe(retry(1), this.handleError<string>('getFusionResults', this.httpError));
    /*       .pipe(retry(1),
      tap(res => {
        return console.log('getting fusion results', res);
      }),
       catchError(this.handleError<any>('getFusionResults'))); */
  }

  getDummyResults(): Observable<any> {
    console.log('getting dummy data');
    let page = 'http://localhost:4200/assets/demo.txt';
    return this.http.get<any>(page, {observe: 'body'})
    ;
  }

  getUser(id: string): Observable<User> {
    return this.http
      .get<User>(`${this.endPoint}/users/${id}`)
      .pipe(retry(1));
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


  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`CrudService: ${message}`);
  }
}
