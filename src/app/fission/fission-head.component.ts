import { Component, OnInit, inject, signal } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { FissionFaceComponent } from './fission-face/fission-face.component';
import { Store } from '@ngrx/store';
import { CrudService } from '../core/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IElementDataModel } from '../core/models/element-data.model';
import { ILookupDataModel } from '../core/models/lookup-data.model';
import { FormGroup } from '@angular/forms';
import * as appState from '../state';
import * as fissionState from '../state/fission';
import { HttpClientModule } from '@angular/common/http';
import { ReportParameters } from '../core/models/report-parameters.model';
import { ReactionTypeEnum } from '../core/models/reaction-type-enum.model';
import { KeyValuePair } from '../core/models/key-value-pair.model';
import { SqlForm } from '../core/models/sql-form.model';
import { FissionForm } from '../core/models/fission-form.model';
@Component({
  selector: 'mfmp-fission-head',
  standalone: true,
  template: `
    <mfmp-fission-face
      [elements]="elements | async"
      [sortFields]="sortFields | async"
      [coreQuery]="coreQuery"
      [fullQuery]="fullQuery"
      (doit)="submit_coreQuery($event)"
      (formChanges)="form_changes($event)"
      (sqlChanges)="sql_changes($event)"></mfmp-fission-face>
  `,
  styles: [''],
  imports: [CommonModule, HttpClientModule, FissionFaceComponent],
  providers: [AsyncPipe, { provide: HeaderProviderService }]
})
export class FissionHeadComponent implements OnInit {
  asyncPipe = inject(AsyncPipe);
  store: Store = inject(Store);
  http: CrudService = inject(CrudService);
  router: Router = inject(Router);
  coreQuery = '';
  fullQuery = '';
  route: ActivatedRoute = this.router.routerState.root;
  elements!:Observable<IElementDataModel[] | null>;
  sortFields!: Observable<ILookupDataModel[] | null>;
  ready = signal(false);
  subscriptions: Subscription = new Subscription();
  submittable = false;
  readonly description =
    'This program ("Fission.php") enables SQL commands to coreQuery the Fission tables originally created from Dr Parkhomov\'s spreadsheets.';

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

  form_changes(form: FissionForm) {
    this.buildCoreQuery(form);
  }

  buildCoreQuery = (form: FissionForm) => {
    const resultLimit = form.resultLimit;
    const mevLimit = form.mevLimit;
    const orderBy = form.orderBy;
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
    let mevClause = '';

    /**
     * spin
     */
    if (form.nuclides.nuclearSpin !== 'bf') {
      spinChoices.push(`nBorF1 = '${form.nuclides.nuclearSpin}'`);
    }
    if (form.nuclides.atomicSpin !== 'bf') {
      spinChoices.push(`aBorF1 = '${form.nuclides.atomicSpin}'`);
    }
    if (form.output1.nuclearSpin !== 'bf') {
      spinChoices.push(`nBorF2 = '${form.output1.nuclearSpin}'`);
    }
    if (form.output1.atomicSpin !== 'bf') {
      spinChoices.push(`aBorF2 = '${form.output1.atomicSpin}'`);
    }
    if (form.output2.nuclearSpin !== 'bf') {
      spinChoices.push(`nBorF = '${form.output2.nuclearSpin}'`);
    }
    if (form.output2.atomicSpin !== 'bf') {
      spinChoices.push(`aBorF = '${form.output2.atomicSpin}'`);
    }
    if (spinChoices.length > 0) {
      spinClause = spinChoices.join(' and ');
    }
    /**
     * Elements
     */
    const leftElements = form.nuclides.selectedElements ?? [];

    if (leftElements.length > 0) {
      elementChoices.push(
        `E = '${leftElements}'`
      );
    }
 
    if (elementChoices.length > 0) {
      elementsClause = elementChoices.join(' and ');
      /*       if (elementChoices.length > 1) {
        elementsClause = `(${elementsClause})`;
      } */
    }

    if (mevLimit > 0) {
      mevClause = `and MeV > ${mevLimit}`
    }
    /**
     * FilterChoices combines neutrinos, elements, MeV and spin
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
      console.log('descending', sortDescending)
    }
    /**
     * Limit
     */
    if (resultLimit) {
      limitClause = `limit ${resultLimit}`;
    }

    this.coreQuery = `${elementsClause} ${mevClause} ${orderByClause} ${limitClause}`
      .trim()
      .replace(/\s\s/g, ' ');
    this.fullQuery = `${columnsClause} ${tablesClause} where ${filterClause} ${mevClause} ${orderByClause} ${limitClause}`;
  };

  submit_coreQuery = (fissionForms: FormGroup[]): void => {
    const kvp = this.buildRequestForm(fissionForms);
    const extras: ReportParameters = {
      url: 'fission',
      reactionType: ReactionTypeEnum.Fission,
      query: this.coreQuery,
      tables: 3
    };
    this.store.dispatch(appState.actions.setReportParameters({ payload: extras }));
    this.store.dispatch(fissionState.actions.fetchAllResults({ payload: kvp }));
    this.router.navigate(['/fission/reports']);
  };

  forceReset = () => {
    const reset =
      this.router.lastSuccessfulNavigation?.extractedUrl.queryParamMap.get(
        'reset'
      );
    if (reset) {
      this.store.dispatch(fissionState.actions.reset());
      this.router.navigate(['/fission']);
    }
  };
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.forceReset();
    this.elements = this.store.select(appState.feature.selectElements);
    this.sortFields = this.store.select(appState.feature.selectReactionSortFields);
    this.headerService.buildPageHeader('fission');
    this.ready.set(true);
  }
  /**
   * map the formgroup to an array of key-value pairs
   * to be processed upstream
   * @param fissionForm
   * @returns KeyValuePairs[]
   */
  buildRequestForm(forms: FormGroup[]): KeyValuePair[] {
    let fissionForm: FissionForm = forms[0].value as FissionForm;
    let sqlForm: FormGroup = forms[1];
    let kvp = new Array<KeyValuePair>();
    this.coreQuery = sqlForm.get('coreQuery')?.value;

    kvp.push(new KeyValuePair({ key: 'doit', value: 'execute_query' }));
    kvp.push(new KeyValuePair({ key: 'query', value: this.coreQuery }));
    kvp.push(
      new KeyValuePair({ key: 'table_name', value: fissionForm.tableSet })
    );
    if (fissionForm.inputNeutrinos) {
      kvp.push(new KeyValuePair({ key: 'sql_tables[]', value: 'left' }));
    }
    if (fissionForm.noNeutrinos) {
      kvp.push(new KeyValuePair({ key: 'sql_tables[]', value: 'none' }));
    }
    if (fissionForm.outputNeutrinos) {
      kvp.push(new KeyValuePair({ key: 'sql_tables[]', value: 'right' }));
    }
    kvp.push(
      new KeyValuePair({
        key: 'nBorF1',
        value: fissionForm.nuclides.nuclearSpin
      })
    );
    kvp.push(
      new KeyValuePair({
        key: 'aBorF1',
        value: fissionForm.nuclides.atomicSpin
      })
    );
    kvp.push(
      new KeyValuePair({
        key: 'nBorF2',
        value: fissionForm.output1.nuclearSpin
      })
    );
    kvp.push(
      new KeyValuePair({
        key: 'aBorF2',
        value: fissionForm.output1.atomicSpin
      })
    );
    kvp.push(
      new KeyValuePair({
        key: 'nBorF',
        value: fissionForm.output2.nuclearSpin
      })
    );
    kvp.push(
      new KeyValuePair({
        key: 'aBorF',
        value: fissionForm.output2.atomicSpin
      })
    );
    return kvp;
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
      clause = `(${parts.join(" or ")})`;
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
};
