import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IElementDataModel } from '../models/element.data.model';
import { IFusionCompositeResults } from '../models/fusion-composite-results.model';
import { IKeyValuePair } from '../models/key-value.pair.model';
import { ILookupDataModel } from '../models/lookup..data.model';
import { extractTablesFromPage } from './page.services';

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
  private _endPoint: string = environment.proxy + environment.apiUrl;
  // private user: User;

  public get endPoint(): string {
    return this._endPoint;
  }

  constructor(private http: HttpClient) {
    // this.user = <User>{ id: '' };
  }

  getUsers(): Observable<User> {
    return this.http.get<User>(this.endPoint + '/users').pipe(retry(1));
  }

  /*   getGlobalData(): Observable<GlobalCollections> {
    let result: GlobalCollections = { elements: [], lookups: [] };
    this.getElements().pipe(map((res) => result.elements));
    this.getLookups().pipe(map((res) => result.lookups));
    return of(result);
  } */

  getElements(): Observable<IElementDataModel[]> {
    let page = `${this.endPoint}Elements.php`;
    return this.http.get<IElementDataModel[]>(page).pipe(retry(1));
  }

  getLookups(): Observable<ILookupDataModel[]> {
    let page = `${this.endPoint}Lookups.php`;
    return this.http.get<ILookupDataModel[]>(page).pipe(retry(1));
  }

  getFusionResults(payload: IKeyValuePair[]): IFusionCompositeResults {
    console.log('crudservice.getfusionresults');
    let page: string = `${this.endPoint}Fusion.php`;
    let result: IFusionCompositeResults = {
      elementResults: [],
      fusionResults: [],
      nuclideResults: []
    };
    this.http.post(page, payload, { responseType: 'text' }).pipe(
      map((data) => {
        result = this.parseFusionResults(data);
        return result;
      }),
      catchError((err) => {
        throw `Error in ${'getFusionResults'}. err=${err}`;
      })
    );
    return result;
  }

  getDummyResults(): Observable<any> {
    console.log('getting dummy data');
    let page = 'http://localhost:4200/assets/demo.txt';
    return this.http.get<any>(page, { observe: 'body' });
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.endPoint}/users/${id}`).pipe(retry(1));
  }

  parseFusionResults(html: string): IFusionCompositeResults {
    const nodes = extractTablesFromPage(html);
    console.log(nodes);
    debugger;
    let result: IFusionCompositeResults = {
      elementResults: [],
      fusionResults: [],
      nuclideResults: []
    };
    return result;
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
