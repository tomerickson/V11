import { Injectable, inject } from '@angular/core';
import { IFissionCompositeResults } from '../core/models/fission-composite-results.model';
import { extractTablesFromPage } from '../core/services/page.services';
import { CrudService } from '../core/services/crud.service';
import * as helpers from '../core/services/helpers';
import { KeyValuePair } from '../core/models/key-value-pair.model';
import { Observable } from 'rxjs';

@Injectable()
export class FissionService {
  crud = inject(CrudService);
  page = 'Fission.php';

  
  getFissionResults = (payload: KeyValuePair[]): Observable<string> => {
    return this.crud.postPage(this.page, helpers.KvpsToFormData(payload));
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
    if (helpers.modelMatches(thead, ['id', 'neutrino'])) {
      output.reactionResults = tbody;
    } else if (helpers.modelMatches(thead, ['id', 'A', 'Z'])) {
      output.nuclideResults = tbody;
    } else if (helpers.modelMatches(thead, ['Z', 'E', 'EName'])) {
      output.elementResults = tbody;
    }
    return output;
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
        reactionResults: [],
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
          result.reactionResults.length > 0 &&
          result.nuclideResults.length > 0 &&
          result.elementResults.length > 0;
      }
      return result;
    };
}
