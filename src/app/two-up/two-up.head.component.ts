import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IElementDataModel } from '../core/models/element-data.model';
import { ILookupDataModel } from '../core/models/lookup-data.model';
import { ReactionTypeEnum } from '../core/models/reaction-type-enum.model';
import { ReportParameters } from '../core/models/report-parameters.model';
import { SqlForm } from '../core/models/sql-form.model';
import { TwoUpForm } from '../core/models/two-up-form.model';
import { CrudService } from '../core/services/crud.service';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import * as appState from '../state';
import { actions } from '../state/two-up';
import { TwoUpFaceComponent } from './two-up-face/two-up-face.component';
import { KeyValuePair } from '../core/models/key-value-pair.model';

@Component({
  selector: 'mfmp-two-up',
  standalone: true,
  imports: [CommonModule, TwoUpFaceComponent],
  template: `
    <mfmp-two-up-face
      [elements]="elements | async"
      [sortFields]="sortFields | async"
      [coreQuery]="coreQuery"
      [fullQuery]="fullQuery"
      (doit)="submit_coreQuery($event)"
      (formChanges)="form_changes($event)"
      (sqlChanges)="sql_changes($event)"></mfmp-two-up-face>
  `,
  styleUrls: [],
  providers: [{ provide: HeaderProviderService }]
})
export class TwoUpHeadComponent {
  store: Store = inject(Store);
  http: CrudService = inject(CrudService);
  router: Router = inject(Router);
  coreQuery = '';
  fullQuery = '';
  route: ActivatedRoute = this.router.routerState.root;
  elements!: Observable<IElementDataModel[]>;
  sortFields!: Observable<ILookupDataModel[]>;
  ready: BehaviorSubject<boolean> = new BehaviorSubject(false);
  subscriptions: Subscription = new Subscription();
  submittable = false;

  readonly description =
    "This program enables SQL commands to query the TwoToTwo (2-2) tables originally created from Dr Parkhomov's spreadsheets.";

  constructor(private headerService: HeaderProviderService) {}

  sql_changes(form: SqlForm) {
    console.log('form', form);
    if (form) {
      const query = form.coreQuery;
      const regex = new RegExp(
        /select\s+(.*?)\s+from\s+(.*?)\s+where\s+(.*?)\s+\order\sby\s+(.*?)\s+\limit\s+(.*?)/i
      );
      const clauses = regex.exec(query);
      console.log('clauses', clauses);
    }
  }

  form_changes(form: TwoUpForm) {
    this.buildCoreQuery(form);
  }

  buildCoreQuery = (form: TwoUpForm) => {
    const resultLimit = form.resultLimit;
    const orderBy = form.orderBy;
    const elementJoin = form.elementJoin;
    const sortDescending = form.sortDescending;
    const inputNeutrinos = form.inputNeutrinos;
    const noNeutrinos = form.noNeutrinos;
    const outputNeutrinos = form.outputNeutrinos;
    const columnsClause = 'select *';
    const tablesClause = 'from ' + form.tableSet;
    const neutrinoClause = this.buildNeutrinoClause(
      inputNeutrinos,
      noNeutrinos,
      outputNeutrinos
    );

    const elementChoices: string[] = [];
    const spinChoices: string[] = [];
    let elementsClause = '';
    let spinClause = '';
    let filterClause = '';
    let orderByClause = '';
    let limitClause = '';

    /**
     * spin
     */
    if (form.leftNuclides.nuclearSpin !== 'bf') {
      spinChoices.push(`nBorF1 = '${form.leftNuclides.nuclearSpin}'`);
    }
    if (form.leftNuclides.atomicSpin !== 'bf') {
      spinChoices.push(`aBorF1 = '${form.leftNuclides.atomicSpin}'`);
    }
    if (form.rightNuclides.nuclearSpin !== 'bf') {
      spinChoices.push(`nBorF2 = '${form.rightNuclides.nuclearSpin}'`);
    }
    if (form.rightNuclides.atomicSpin !== 'bf') {
      spinChoices.push(`aBorF2 = '${form.rightNuclides.atomicSpin}'`);
    }
    if (form.leftResults.nuclearSpin !== 'bf') {
      spinChoices.push(`nBorF3 = '${form.leftResults.nuclearSpin}'`);
    }
    if (form.leftResults.atomicSpin !== 'bf') {
      spinChoices.push(`aBorF3 = '${form.leftResults.atomicSpin}'`);
    }
    if (form.rightResults.nuclearSpin !== 'bf') {
      spinChoices.push(`nBorF4 = '${form.rightResults.nuclearSpin}'`);
    }
    if (form.rightResults.atomicSpin !== 'bf') {
      spinChoices.push(`aBorF4 = '${form.rightResults.atomicSpin}'`);
    }
    if (spinChoices.length > 0) {
      spinClause = spinChoices.join(' and ');
    }
    /**
     * Elements
     */
    const leftElements = form.leftNuclides.selectedElements ?? [];
    const rightElements = form.rightNuclides.selectedElements ?? [];

    if (leftElements.length > 0) {
      elementChoices.push(
        `E1 in ${this.combineElements(leftElements, [], true)}`
      );
    }
    if (rightElements.length > 0) {
      elementChoices.push(
        `E2 in ${this.combineElements(rightElements, [], true)}`
      );
    }
    if (elementChoices.length > 0) {
      elementsClause = elementChoices[0];
    }
    if (elementChoices.length > 1) {
      elementsClause = elementsClause + ` ${elementJoin} `;
      elementsClause += elementChoices[1];
      if (elementJoin === 'or') {
        elementsClause = `(${elementsClause})`;
      }
    }

    /**
     * FilterChoices combines neutrinos, elements and spin
     */
    let filterChoices: string[] = [];
    if (neutrinoClause) {
      filterChoices.push(neutrinoClause);
    }
    if (elementsClause) {
      filterChoices.push(elementsClause);
    }
    if (spinClause) {
      filterChoices.push(spinClause);
    }
    if (filterChoices.length > 0) {
      filterClause = filterChoices.join(' and ');
    }
    /**
     * Order by
     */
    if (orderBy) {
      orderByClause = `order by ${orderBy}`;
      if (sortDescending === true) {
        orderByClause += ` desc`;
      }
      console.log('descending', sortDescending);
    }
    /**
     * Limit
     */
    if (resultLimit) {
      limitClause = `limit ${resultLimit}`;
    }

    this.coreQuery = `${elementsClause} ${orderByClause} ${limitClause}`
      .trim()
      .replace(/\s\s/g, ' ');
    this.fullQuery = `${columnsClause} ${tablesClause} where ${filterClause} ${orderByClause} ${limitClause}`;
  };

  submit_coreQuery = (twoupForms: FormGroup[]): void => {
    const form = this.buildRequestForm(twoupForms);
    const extras: ReportParameters = {
      url: 'two-up',
      reactionType: ReactionTypeEnum.TwoUp,
      query: this.coreQuery,
      tables: 3
    };
    this.store.dispatch(appState.actions.setReportParameters({ payload: extras }));
    this.store.dispatch(actions.fetchAllResults({ payload: form }));
    this.router.navigate(['/two-up/reports']);
  };

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    const reset =
      this.router.lastSuccessfulNavigation?.extractedUrl.queryParamMap.get(
        'reset'
      );
    if (reset) {
      this.store.dispatch(actions.reset());
    }
    this.elements = this.store.select(appState.feature.selectElements);
    this.sortFields = this.store.select(appState.feature.selectReactionSortFields);
    this.headerService.buildPageHeader('two-up');
    this.ready.next(true);
  }

  /**
   * Create FormData to be processed upstream
   * @param forms
   * @returns
   */
  buildRequestForm = (forms: FormGroup[]): KeyValuePair[] => {
    const form: TwoUpForm = forms[0].value as TwoUpForm;
    const sqlForm: FormGroup = forms[1];
    const payload: KeyValuePair[] = [];
    const coreQuery: string = sqlForm.get('coreQuery')?.value;
    payload.push(new KeyValuePair({ key: 'doit', value: 'execute_query' }));
    payload.push(new KeyValuePair({ key: 'query', value: coreQuery }));
    payload.push(new KeyValuePair({ key: 'table_name', value: form.tableSet }));
    if (form.inputNeutrinos)
      payload.push(new KeyValuePair({ key: 'sql_tables[]', value: 'left' }));
    if (form.noNeutrinos)
      payload.push(new KeyValuePair({ key: 'sql_tables[]', value: 'none' }));
    if (form.outputNeutrinos)
      payload.push(new KeyValuePair({ key: 'sql_tables[]', value: 'right' }));

    payload.push(
      new KeyValuePair({
        key: 'nBorF1_filter',
        value: form.leftNuclides.nuclearSpin
      })
    );
    payload.push(
      new KeyValuePair({
        key: 'aBorF1_filter',
        value: form.leftNuclides.atomicSpin
      })
    );
    payload.push(
      new KeyValuePair({
        key: 'nBorF2_filter',
        value: form.rightNuclides.nuclearSpin
      })
    );
    payload.push(
      new KeyValuePair({
        key: 'aBorF2_filter',
        value: form.rightNuclides.atomicSpin
      })
    );
    payload.push(
      new KeyValuePair({
        key: 'nBorF3_filter',
        value: form.leftResults.nuclearSpin
      })
    );
    payload.push(
      new KeyValuePair({
        key: 'aBorF3_filter',
        value: form.leftResults.atomicSpin
      })
    );
    payload.push(
      new KeyValuePair({
        key: 'nBorF4_filter',
        value: form.rightResults.nuclearSpin
      })
    );
    payload.push(
      new KeyValuePair({
        key: 'aBorF4_filter',
        value: form.rightResults.atomicSpin
      })
    );
    return payload;
  };

  buildNeutrinoClause = (
    left: boolean,
    none: boolean,
    right: boolean
  ): string => {
    let parts: string[] = [];
    let clause: string = '';
    if (left) parts.push(`neutrino = 'left'`);
    if (none) parts.push(`neutrino = 'none'`);
    if (right) parts.push(`neutrino = 'right'`);

    if (parts.length > 0 && parts.length < 3) {
      clause = `(${parts.join(' or ')})`;
    }
    return clause;
  };

  /**
   * Merge the left-side and right-side element selections
   *
   * @param leftElements
   * @param rightElements
   * @param stringify
   * @returns combined elements
   * @description if stringify is true, combine
   */
  combineElements = (
    a: string[],
    b: string[],
    stringify: boolean = false
  ): string[] | string => {
    const c = a.concat(b.filter((item) => a.indexOf(item) < 0));

    if (stringify) {
      return `('${c.join("','")}')`;
    } else {
      return c;
    }
  };
}
