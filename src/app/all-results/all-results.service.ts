import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AllResultsResponseModel } from '../core/models/all-results-response.model';
import { AppConfigService } from '../core/config/app-config.service';
import { CrudService } from '../core/services/crud.service';
import { extractHref, stringifyFormData } from '../core/services/helpers';
import { IAllResultsDataModel } from '../core/models/all-results-data.model';
import { parseDate } from '../core/services/date-helpers';
import * as state from '../state/all-results';
import { PageNavigator } from '../shared/models/page-navigator';
import { Store } from '@ngrx/store';

@Injectable()
export class AllResultsService {

  store = inject(Store);
  config: AppConfigService = inject(AppConfigService);
  crud: CrudService = inject(CrudService);

  page = 'list_results.php';

  getAllResultsPage = (query: string): Observable<string> => {
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
    result.reactionResults.splice(0,1);
    result.reactionResults = result.reactionResults.map(row => this.rowHandler(row))
    return result;
  }

  rowHandler = (row: any[]): IAllResultsDataModel => {
    const item = {} as IAllResultsDataModel;
    item.query = row[0];
    item.size = row[1];
    item.date = parseDate(row[2]);
    item.link = extractHref(row[3])
    return item;
  }

  navigate = (navigator: PageNavigator) => {
    this.store.dispatch(state.actions.setPage({payload: navigator}))
  }

  openLink = (link: string) => {
    window.open(link, '_blank', 'noreferrerr, noopener');
  }
}
