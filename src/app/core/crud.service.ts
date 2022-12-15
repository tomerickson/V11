import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

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

@Injectable({providedIn: 'root'})
export class CrudService {
  
  private httpError: any;
  private endPoint = 'http://localhost:4200';

  constructor(private http: HttpClient) {
   }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  getUsers(): Observable<User> {
    return this.http.get<User>(this.endPoint + '/users')
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }
/*
  getUser(id): Observable<User> {
    return this.http.get<User>(this.endPoint + '/users/' + id)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }  

  create(employee): Observable<User> {
    return this.http.post<User>(this.endPoint + '/users', JSON.stringify(employee), this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }  

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
*/
}
