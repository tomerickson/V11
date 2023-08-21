import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from '../core/config/app-config.service';
import { IElementDataFormModel } from '../core/models/element-data-form.model';
import { ElementDataResultsModel } from '../core/models/element-data-results.model';
import { CrudService } from '../core/services/crud.service';
import { getFormData, stringifyFormData } from '../core/services/helpers';

@Injectable()
export class ElementDataService {
  config: AppConfigService = inject(AppConfigService);
  crud: CrudService = inject(CrudService);
  page = 'ShowElementData.php';

  getElementDataPage = (form: IElementDataFormModel): Observable<string> => {
    const formString = stringifyFormData(getFormData(form));
    return this.crud.postPage(this.page, formString);
  };

  extractElementDataResults = (html: string): ElementDataResultsModel => {
/*     const parser = new DOMParser();
    const document: Document = parser.parseFromString(html, 'text/html');
    const tables: HTMLTableElement[] = document.body.querySelectorAll(
      'table.results'
    ) as any as HTMLTableElement[];
    let reactionColumns: string[] = [];
    for (let i = 0; i < 4; i++) {
        reactionColumns.push(tables[0].rows[0].cells[i].textContent ?? '');
    } */
    const reactionColumns = ['xxx', 'xxx', 'xxx']
    const result: ElementDataResultsModel = new ElementDataResultsModel(html, reactionColumns);
    return result;
  };
}
