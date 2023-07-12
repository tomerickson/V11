import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IElementDataModel } from '../models/element-data.model';
import { IFissionCompositeResults } from '../models/fission-composite-results.model';
import { IFusionCompositeResults } from '../models/fusion-composite-results.model';
import { KeyValuePair } from '../models/key-value-pair.model';
import { ILookupDataModel } from '../models/lookup-data.model';
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
  private http = inject(HttpClient);

  private _endPoint: string = environment.proxy + environment.apiUrl;
  // private user: User;

  public get endPoint(): string {
    return this._endPoint;
  }

  /**
   * Postback for the fusion page.
   *
   * We can use POST (default) or GET.
   *
   * @param payload
   * @param method
   * @returns request body
   * @remarks
   * Using GET lets us insert CORS proxy servers that don't support the POST method.
   */
  getFusionResults(
    payload: KeyValuePair[],
    method: 'GET' | 'POST' = 'POST'
  ): Observable<string> {
    let page: string = `${this.endPoint}Fusion.php`;
    if (method === 'POST') {
      return this.http.post(page, this.buildFormData(payload), {
        responseType: 'text',
        observe: 'body'
      });
    } else {
      const url =
        page +
        '/?' +
        encodeURI(payload.map((each) => each.asString()).join('&'));
      return this.http.get<any>(url, {
        observe: 'body'
      });
    }
  }

  getFissionResults = (payload: KeyValuePair[]): Observable<string> => {
    let page: string = `${this.endPoint}Fission.php`;
    return this.http.post(page, this.buildFormData(payload), {
      responseType: 'text',
      observe: 'body'
    });
  };

  getPage = (page: string): Observable<string> => {
    const url = `${this.endPoint}${page}`;
    console.log('getPage url', url);
    return this.http.get(url, { responseType: 'text', observe: 'body' });
  };

  postPage = (page: string, payload: any, headers?: HttpHeaders): Observable<string> => {
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
      const tbody: any[] = table;
      result = this.parseFusionTable(thead, tbody, result);
    }
    result.ok =
      result.fusionResults.length > 0 &&
      result.nuclideResults.length > 0 &&
      result.elementResults.length > 0;
    return result;
  };

  /**
   *
   * Extract the results tables from the page and convert them
   * into DTOs, then bundle them into a IFissionCompositeResults object.
   *
   * @param html
   * @returns
   */
  parseFissionResults = (html: string): IFissionCompositeResults => {
    let result: IFissionCompositeResults = {
      fissionResults: [],
      nuclideResults: [],
      elementResults: [],
      ok: true
    };
    const data = extractTablesFromPage(html);
    for (let i = 0; i < 3; i++) {
      const table: any[] = data[i];
      const thead: any[] = table[0];
      const tbody: any[] = table;
      result = this.parseFissionTable(thead, tbody, result);
    }
    for (let i = 0; i < 3; i++) {
      result.ok =
        result.fissionResults.length > 0 &&
        result.nuclideResults.length > 0 &&
        result.elementResults.length > 0;
    }
    return result;
  };

  /**
   * Match up the first fields of the incoming
   * header to the expected columns to determine the
   * result type.
   *
   * @param thead
   * @param tbody
   * @param output
   * @returns
   */
  parseFusionTable = (
    thead: string[],
    tbody: any[],
    output: IFusionCompositeResults
  ) => {
    if (this.modelMatches(thead, ['id', 'neutrino'])) {
      output.fusionResults = tbody;
    } else if (this.modelMatches(thead, ['id', 'A', 'Z'])) {
      output.nuclideResults = tbody;
    } else if (this.modelMatches(thead, ['Z', 'E', 'EName'])) {
      output.elementResults = tbody;
    }
    return output;
  };
  /**
   * Match up the first fields of the incoming
   * header to the expected columns to determine the
   * result type.
   *
   * @param thead
   * @param tbody
   * @param output
   * @returns
   */
  parseFissionTable = (
    thead: string[],
    tbody: any[],
    output: IFissionCompositeResults
  ) => {
    if (this.modelMatches(thead, ['id', 'neutrino'])) {
      output.fissionResults = tbody;
    } else if (this.modelMatches(thead, ['id', 'A', 'Z'])) {
      output.nuclideResults = tbody;
    } else if (this.modelMatches(thead, ['Z', 'E', 'EName'])) {
      output.elementResults = tbody;
    }
    return output;
  };

  modelMatches = (head: string[], model: string[]): boolean => {
    let matches = 0;
    for (let i = 0; i < model.length; i++) {
      if (model[i] === head[i]) {
        matches++;
      }
    }
    return matches === model.length;
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`CrudService: ${message}`);
  }
}
