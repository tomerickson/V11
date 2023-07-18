import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITwoUpCompositeResults } from '../core/models/two-up-composite-results.model';
import { KeyValuePair } from '../core/models/key-value-pair.model';
import { CrudService } from '../core/services/crud.service';
import { getFormDataString } from '../core/services/helpers';
import { HttpHeaders } from '@angular/common/http';
import * as helpers from '../core/services/helpers'
import { extractTablesFromPage } from '../core/services/page.services';
@Injectable()
export class TwoUpService {

  crud = inject(CrudService);
  page = 'TwoToTwo.php';
  constructor() { }

  getTwoUpResults = (payload: KeyValuePair[]): Observable<string> => {
      const headers: HttpHeaders = new HttpHeaders()
    .set('Accept', 'text/html')
    .set('Content-Type','application/x-www-form-urlencoded');
    return this.crud.postPage(this.page, helpers.KvpsToFormData(payload));
    // return this.crud.postPage(this.page, payload, headers);
  }
  /**
   * Extract the results tables from the page and convert them
   * into DTOs, then bundle them into a ITwoUpCompositeResults object.
   *
   * @param html
   * @returns
   */
  parseTwoUpResults = (html: string): ITwoUpCompositeResults => {
    let result: ITwoUpCompositeResults = {
      reactionResults: [],
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
      result = this.parseTwoUpTable(thead, tbody, result);
    }
    result.ok =
      result.reactionResults.length > 0 &&
      result.nuclideResults.length > 0 &&
      result.elementResults.length > 0;
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
  parseTwoUpTable = (
    thead: string[],
    tbody: any[],
    output: ITwoUpCompositeResults
  ) => {
    if (helpers.modelMatches(thead, ['id', 'neutrino'])) {
      output.reactionResults = tbody;
    } else if (helpers.modelMatches(thead, ['id', 'A', 'Z'])) {
      output.nuclideResults = tbody;
    } else if (helpers.modelMatches(thead, ['Z', 'E', 'EName'])) {
      output.elementResults = tbody;
    }
    return output;
  };
}
