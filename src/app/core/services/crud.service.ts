import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IElementDataModel } from '../models/element-data.model';
import { ILookupDataModel } from '../models/lookup-data.model';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: number;
}

export interface GlobalCollections {
  elements: IElementDataModel[];
  lookups: ILookupDataModel[];
}

@Injectable({ providedIn: 'root' })
export class CrudService {

  private http = inject(HttpClient);
  private headers: HttpHeaders = new HttpHeaders()
  .set('Accept', 'text/html')
  .set('Content-Type','application/x-www-form-urlencoded');

  private _endPoint: string = environment.proxy + environment.apiUrl;
  // private user: User;

  public get endPoint(): string {
    return this._endPoint;
  }

  getPage = (page: string): Observable<string> => {
    const url = `${this.endPoint}${page}`;
    console.log('getPage url', url);
    return this.http.get(url, { responseType: 'text', observe: 'body' });
  };

  postPage = (page: string, payload: any, headers: HttpHeaders = this.headers): Observable<string> => {
    const url = `${this.endPoint}${page}`;
    console.log('postPage url', url);
    return this.http.post(url, payload, {headers: headers,
      responseType: 'text',
      observe: 'body'
    });
  };

  getDummyResults(): Observable<any> {
    console.log('getting dummy data');
    let page = 'http://localhost:4200/assets/demo.txt';
    return this.http.get<any>(page, { observe: 'body' });
  }










}
