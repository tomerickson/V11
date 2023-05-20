import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IElementDataModel } from '../models/element-data.model';
import { IFusionCompositeResults } from '../models/fusion-composite-results.model';
import { IKeyValuePair, KeyValuePair } from '../models/key-value-pair.model';
import { ILookupDataModel } from '../models/lookup.-data.model';
import { extractTablesFromPage } from './page.services';
import { IFusionResultsModel } from '../models/fusion-results.model';
import { INuclideResultsModel } from '../models/nuclide-results.model';
import { IElementResultsModel } from '../models/element-results.model';

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
  http = inject(HttpClient);

  private _endPoint: string = environment.proxy + environment.apiUrl;
  // private user: User;

  public get endPoint(): string {
    return this._endPoint;
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

  getFusionResults(payload: IKeyValuePair[]): Observable<string> {
    let page: string = `${this.endPoint}Fusion.php`;
    return this.http.post(page, this.buildFormData(payload), {
      responseType: 'text',
      observe: 'body'
    });
  }

  getDummyResults(): Observable<any> {
    console.log('getting dummy data');
    let page = 'http://localhost:4200/assets/demo.txt';
    return this.http.get<any>(page, { observe: 'body' });
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.endPoint}/users/${id}`).pipe(retry(1));
  }

  /**
   * Extract the results tables from the page and convert them
   * into DTOs, then bundle them into a IFusionCompositeResults object.
   *
   * @param html
   * @returns
   */
  parseFusionResults = (html: string): IFusionCompositeResults => {
    let result: IFusionCompositeResults = {
      fusionResults: [],
      nuclideResults: [],
      elementResults: [],
      ok: true
    };

    /* data is an array of arrays [3]x[n] */

    const data = extractTablesFromPage(html);
    for (let i = 0; i < 3; i++) {
      const table: any[] = data[i];
      const thead: any[] = table[0];
      const tbody: any[] = table.slice(1);
      result = this.parseTable(thead, tbody, result);
    }
    result.ok =
      result.fusionResults.length > 0 &&
      result.nuclideResults.length > 0 &&
      result.elementResults.length > 0;
    return result;
  };

  parseTable = (
    thead: any[],
    tbody: any[],
    output: IFusionCompositeResults
  ) => {
    if (this.modelMatches(thead, {} as IFusionResultsModel)) {
      output.fusionResults = tbody as IFusionResultsModel[];
    } else if (this.modelMatches(thead, {} as INuclideResultsModel)) {
      output.nuclideResults = tbody as INuclideResultsModel[];
    } else if (this.modelMatches(thead, {} as IElementResultsModel)) {
      output.elementResults = tbody as IElementResultsModel[];
    }
    return output;
  };

  modelMatches = (array: any[], model: {}): boolean => {
    let matches = 0;
    for (let columnName of array) {
      if (columnName in model) matches++;
    }
    return matches === array.length;
  };
  /**
   * Convert kvp array to FormData object
   * for consumption by http.post
   *
   * @param kvp
   * @returns
   */
  buildFormData = (kvp: KeyValuePair[]): FormData => {
    let formData: FormData = new FormData();
    for (let pair of kvp) {
      formData.append(pair.key, pair.value);
    }
    return formData;
  };
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
