import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppConfigService } from '../config/app-config.service';
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
  private config = inject(AppConfigService);
  private http = inject(HttpClient);
  private headers: HttpHeaders = new HttpHeaders()
    .set('Accept', 'text/html')
    .set('Content-Type', 'application/x-www-form-urlencoded');

  private _endPoint: string = (this.config.proxy ?? '') + this.config.apiUrl;

  public get endPoint(): string {
    return this._endPoint;
  }

  getPage = (page: string): Observable<string> => {
    const url = `${this.endPoint}${page}`;
    console.log('getPage url', url);
    return this.http.get(url, { responseType: 'text', observe: 'body' });
  };

  postPage = (
    page: string,
    payload: any,
    headers: HttpHeaders = this.headers,
    useFacade = false
  ): Observable<string> => {
    const url = `${this.endPoint}${page}`;
    console.log('postPage url', url);
    if (useFacade) return this.getDummyResults(page, headers);
    return this.http.post(url, payload, {
      headers: headers,
      responseType: 'text',
      observe: 'body'
    });
  };

  getDummyResults(
    page: string,
    headers: HttpHeaders = this.headers
  ): Observable<any> {
    console.log('getting dummy data');
    let result: Observable<string>;
    try {
       result = this.http.get(`../../../../server/${page}`, {
        headers: headers,
        responseType: 'text',
        observe: 'body'
      });
      return result;
    } catch (err) {
      console.error(err);
      return of('?');
    }
  }
}
