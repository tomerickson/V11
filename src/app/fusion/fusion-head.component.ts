import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IElementDataModel } from '../core/models/element-data.model';
import { KeyValuePair } from '../core/models/key-value-pair.model';
import { ILookupDataModel } from '../core/models/lookup-data.model';
import { ReactionTypeEnum } from '../core/models/reaction-type-enum.model';
import { ReportParameters } from '../core/models/report-parameters.model';
import { CrudService } from '../core/services/crud.service';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { PageActions, globalFeature } from '../state';
import { FusionActions } from '../state/fusion';
import { FusionFaceComponent } from './fusion-face/fusion-face.component';
import { FusionForm } from '../core/models/fusion-form.model';
import { apostrophise } from '../core/services/helpers';
import { SqlForm } from '../core/models/sql-form.model';

@Component({
  standalone: true,
  selector: 'mfmp-fusion-head',
  template: `
    <mfmp-fusion-face
      [elements]="elements | async"
      [sortFields]="sortFields | async"
      [coreQuery]="coreQuery"
      [fullQuery]="fullQuery"
      (doit)="submit_coreQuery($event)"
      (formChanges)="form_changes($event)"
      (sqlChanges)="sql_changes($event)"></mfmp-fusion-face>
  `,
  styles: [''],
  imports: [CommonModule, HttpClientModule, FusionFaceComponent],
  providers: [{ provide: HeaderProviderService }]
})
export class FusionHeadComponent implements OnInit, OnDestroy {
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
    'This program ("Fusion.php") enables SQL commands to coreQuery the Fusion tables originally created from Dr Parkhomov\'s spreadsheets.';

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

  form_changes(form: FusionForm) {
    console.log('fusionForm:', form);
    this.buildCoreQuery(form);
  }

  buildCoreQuery = (form: FusionForm) => {
    const resultLimit = form.resultLimit;
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
    if (form.resultNuclides.nuclearSpin !== 'bf') {
      spinChoices.push(`nBorF = '${form.resultNuclides.nuclearSpin}'`);
    }
    if (form.resultNuclides.atomicSpin !== 'bf') {
      spinChoices.push(`aBorF = '${form.resultNuclides.atomicSpin}'`);
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
        `E1 in (${this.combineElements(leftElements, [], true)})`
      );
    }
    if (rightElements.length > 0) {
      elementChoices.push(
        `E2 in (${this.combineElements(rightElements, [], true)})`
      );
    }
    if (elementChoices.length > 0) {
      elementsClause = elementChoices.join(' and ');
      /*       if (elementChoices.length > 1) {
        elementsClause = `(${elementsClause})`;
      } */
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
      console.log('descending', sortDescending)
    }
    /**
     * Limit
     */
    if (resultLimit) {
      limitClause = ` limit ${resultLimit}`;
    }

    this.coreQuery = `${filterClause} ${orderByClause} ${limitClause}`
      .trim()
      .replace(/\s\s/g, ' ');
    this.fullQuery = `${columnsClause} ${tablesClause} where ${this.coreQuery}`;
  };

  submit_coreQuery = (fusionForms: FormGroup[]): void => {
    const kvp = this.buildRequestForm(fusionForms);
    const extras: ReportParameters = {
      url: 'fusion',
      reactionType: ReactionTypeEnum.Fusion,
      query: this.coreQuery
    };
    this.store.dispatch(PageActions.setReportParameters({ payload: extras }));
    this.store.dispatch(FusionActions.fetchAllResults({ payload: kvp }));
    this.router.navigate(['/fusion/reports']);
  };

  forceReset = () => {
    const reset =
      this.router.lastSuccessfulNavigation?.extractedUrl.queryParamMap.get(
        'reset'
      );
    if (reset) {
      this.store.dispatch(FusionActions.reset());
      this.router.navigate(['/fusion']);
    }
  };
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.forceReset();
    this.elements = this.store.select(globalFeature.selectElements);
    this.sortFields = this.store.select(globalFeature.selectReactionSortFields);
    this.headerService.buildPageHeader('fusion');
    this.ready.next(true);
  }

  /**
   * map the formgroup to an array of key-value pairs
   * to be processed upstream
   * @param fusionForm
   * @returns KeyValuePairs[]
   */
  buildRequestForm(forms: FormGroup[]): KeyValuePair[] {
    let fusionForm: FusionForm = forms[0].value as FusionForm;
    let sqlForm: FormGroup = forms[1];
    let kvp = new Array<KeyValuePair>();

    this.coreQuery = sqlForm.get('coreQuery')?.value;

    kvp.push(new KeyValuePair({ key: 'doit', value: 'execute_coreQuery' }));
    kvp.push(new KeyValuePair({ key: 'coreQuery', value: this.coreQuery }));
    kvp.push(
      new KeyValuePair({ key: 'table_name', value: fusionForm.tableSet })
    );
    if (fusionForm.inputNeutrinos) {
      kvp.push(new KeyValuePair({ key: 'sql_tables[]', value: 'left' }));
    }
    if (fusionForm.noNeutrinos) {
      kvp.push(new KeyValuePair({ key: 'sql_tables[]', value: 'none' }));
    }
    if (fusionForm.outputNeutrinos) {
      kvp.push(new KeyValuePair({ key: 'sql_tables[]', value: 'right' }));
    }
    kvp.push(
      new KeyValuePair({
        key: 'nBorF1',
        value: fusionForm.leftNuclides.nuclearSpin
      })
    );
    kvp.push(
      new KeyValuePair({
        key: 'aBorF1',
        value: fusionForm.leftNuclides.atomicSpin
      })
    );
    kvp.push(
      new KeyValuePair({
        key: 'nBorF2',
        value: fusionForm.rightNuclides.nuclearSpin
      })
    );
    kvp.push(
      new KeyValuePair({
        key: 'aBorF2',
        value: fusionForm.rightNuclides.atomicSpin
      })
    );
    kvp.push(
      new KeyValuePair({
        key: 'nBorF',
        value: fusionForm.resultNuclides.nuclearSpin
      })
    );
    kvp.push(
      new KeyValuePair({
        key: 'aBorF',
        value: fusionForm.resultNuclides.atomicSpin
      })
    );
    return kvp;
  }

  buildNeutrinoClause = (
    left: boolean,
    none: boolean,
    right: boolean
  ): string => {
    let parts: string[] = [];
    let clause: string = '';
    if (left) parts.push(`neutrino = 'left'`);
    if (none) parts.push(apostrophise(`neutrino = 'none'`));
    if (right) parts.push(apostrophise(`neutrino = 'right'`));

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
