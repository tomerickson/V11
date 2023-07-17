import { Injectable, inject } from '@angular/core';
import { CrudService } from '../core/services/crud.service';
import { KeyValuePair } from '../core/models/key-value-pair.model';
import { Observable } from 'rxjs';
import { IFusionCompositeResults } from '../core/models/fusion-composite-results.model';
import { extractTablesFromPage } from '../core/services//page.services';
import * as helpers from '../core/services/helpers';

@Injectable()
export class FusionService {
  crud = inject(CrudService);
  page = 'Fusion.php';
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
  getFusionResults(payload: KeyValuePair[]): Observable<string> {
    const form = helpers.KvpsToFormData(payload);
    return this.crud.postPage(this.page, form);
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
    if (helpers.modelMatches(thead, ['id', 'neutrino'])) {
      output.fusionResults = tbody;
    } else if (helpers.modelMatches(thead, ['id', 'A', 'Z'])) {
      output.nuclideResults = tbody;
    } else if (helpers.modelMatches(thead, ['Z', 'E', 'EName'])) {
      output.elementResults = tbody;
    }
    return output;
  };
}
