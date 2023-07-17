import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITwoUpCompositeResults } from '../core/models/two-up-composite-results.model';
import { KeyValuePair } from '../core/models/key-value-pair.model';
import { CrudService } from '../core/services/crud.service';
import { getFormDataString } from '../core/services/helpers';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class TwoUpService {

  crud = inject(CrudService);
  page = 'TwoToTwo.php';
  constructor() { }

  getTwoUpResults = (payload: KeyValuePair[]): Observable<string> => {
    const form = getFormDataString(payload);
    const headers: HttpHeaders = new HttpHeaders()
    .set('Accept', 'text/html')
    .set('Content-Type','application/x-www-form-urlencoded');
    return this.crud.postPage(this.page, form, headers);
  }

  parseTwoUpResults = (html: string): ITwoUpCompositeResults => {
    return {} as ITwoUpCompositeResults
  }
}
