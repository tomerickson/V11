import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AllResultsResponseModel } from '../core/models/all-results-response.model';
import { AppConfigService } from '../core/config/app-config.service';
import { CrudService } from '../core/services/crud.service';
import { stringifyFormData } from '../core/services/helpers';

@Injectable()
export class AllResultsService {
  config: AppConfigService = inject(AppConfigService);
  crud: CrudService = inject(CrudService);
  page = 'list-results.php';

  getAllResultsPage = (): Observable<string> => {
    return this.crud.getPage(this.page);
  };

  /* extractAllResultsQuery = (html: string): string => {
    const parser = new DOMParser();
    const document: Document = parser.parseFromString(html, 'text/html');
    const form = document.body.querySelector(
      'form'
    ) as HTMLFormElement;
    const options = form.querySelectorAll('option');
    const table = form.querySelector('table.results') as HTMLTableElement;

    return sql;
  }; */

  refreshResults = (order: string): Observable<string> => {
    const form: FormData = new FormData();

    form.append('doit', 'refresh');
    form.append('order', order);
    const formString = stringifyFormData(form);
    return this.crud.postPage(this.page, formString);
  };

  extractResultsTable = (html: string): AllResultsResponseModel => {
    const parser = new DOMParser();
    const document: Document = parser.parseFromString(html, 'text/html');
    const table: HTMLTableElement = document.body.querySelector(
      'table.results'
    ) as HTMLTableElement;
    const cell = table.rows[0].cells[0].innerText;

    const result: AllResultsResponseModel = new AllResultsResponseModel(html, [
      cell
    ]);
    return result;
  };
}
