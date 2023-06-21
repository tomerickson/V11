import { Component, OnInit, inject, signal } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { FissionFaceComponent } from './fission-face/fission-face.component';
import { Store } from '@ngrx/store';
import { CrudService } from '../core/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IElementDataModel } from '../core/models/element-data.model';
import { ILookupDataModel } from '../core/models/lookup.-data.model';
import { FormGroup } from '@angular/forms';
import { PageActions, globalFeature } from '../state';
import { FissionActions } from '../state/fission';
import { HttpClientModule } from '@angular/common/http';
import { ReportParameters} from '../core/models/report-parameters.model';
import { ReactionTypeEnum } from '../core/models/reaction-type-enum.model';
import { formatSpinChoices } from '../core/services/page.services';
import { KeyValuePair } from '../core/models/key-value-pair.model';
@Component({
  selector: 'mfmp-fission-head',
  standalone: true,
  template: `<mfmp-fission-face
  [elements]="elements()"
  [sortFields]="sortFields()"
  (doit)="submit_query($event)"></mfmp-fission-face>`,
  styles: [''],
  imports: [CommonModule, HttpClientModule, FissionFaceComponent],
  providers: [AsyncPipe,
        { provide: HeaderProviderService }
  ]
})
export class FissionHeadComponent implements OnInit {

  asyncPipe = inject(AsyncPipe);
  store: Store = inject(Store);
  http: CrudService = inject(CrudService);
  router: Router = inject(Router);
  headerService = inject(HeaderProviderService);

  query!: string;
  route: ActivatedRoute = this.router.routerState.root;
  elements = signal<IElementDataModel[]|null>(this.asyncPipe.transform(this.store.select(globalFeature.selectElements)));
  sortFields = signal<ILookupDataModel[]|null>(this.asyncPipe.transform(this.store.select(globalFeature.selectReactionSortFields)));
ready = signal(false);
subscriptions: Subscription = new Subscription();
submittable = false;
readonly description = 'This program ("Fission.php") enables SQL commands to query the Fission tables created from Dr Parkhomov\'s spreadsheets.'
  constructor() {}

  submit_query = (fissionForms: FormGroup[]): void => {
    const kvp = this.buildRequestForm(fissionForms);
    const extras: ReportParameters = {
      url: 'fission',
      reactionType: ReactionTypeEnum.Fission,
      query: this.query
    }
    this.store.dispatch(PageActions.setReportParameters({payload: extras}));
    this.store.dispatch(FissionActions.fetchAllResults({payload: kvp}));
    this.router.navigate(['/fission/reorts']);  
  };

  forceReset = () => {
    const reset = this.router.lastSuccessfulNavigation?.extractedUrl.queryParamMap.get(
      'reset'
    );
    if (reset) {
      this.store.dispatch(FissionActions.reset());
      this.router.navigate(['/fission']);
    }
  }
  ngOnDestroy = () => {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.forceReset();
 this.headerService.buildPageHeader('fission');
     this.ready.mutate(() => true);
  }
/**
   * map the formgroup to an array of key-value pairs
   * to be processed upstream
   * @param fusionForm
   * @returns KeyValuePairs[]
   */
buildRequestForm(forms: FormGroup[]): KeyValuePair[] {
  let fusionForm: FormGroup = forms[0];
  let sqlForm: FormGroup = forms[1];
  let kvp = new Array<KeyValuePair>();
  const inputNeutrinos = fusionForm.get('inputNeutrinos')?.value;
  const noNeutrinos = fusionForm.get('noNeutrinos')?.value;
  const outputNeutrinos = fusionForm.get('outputNeutrinos')?.value;
  const leftNuclearBosons: boolean = fusionForm.get(
    'leftNuclides.nuclearBosons'
  )?.value;
  const leftNuclearFermions: boolean = fusionForm.get(
    'leftNuclides.nuclearFermions'
  )?.value;
  const leftAtomicBosons: boolean = fusionForm.get(
    'leftNuclides.atomicBosons'
  )?.value;
  const leftAtomicFermions: boolean = fusionForm.get(
    'leftNuclides.atomicFermions'
  )?.value;
  const rightNuclearBosons: boolean = fusionForm.get(
    'rightNuclides.nuclearBosons'
  )?.value;
  const rightNuclearFermions: boolean = fusionForm.get(
    'rightNuclides.nuclearFermions'
  )?.value;
  const rightAtomicBosons: boolean = fusionForm.get(
    'rightNuclides.atomicBosons'
  )?.value;
  const rightAtomicFermions: boolean = fusionForm.get(
    'rightNuclides.atomicFermions'
  )?.value;
  const resultNuclearBosons: boolean = fusionForm.get(
    'resultNuclides.nuclearBosons'
  )?.value;
  const resultNuclearFermions: boolean = fusionForm.get(
    'resultNuclides.nuclearFermions'
  )?.value;
  const resultAtomicBosons: boolean = fusionForm.get(
    'resultNuclides.atomicBosons'
  )?.value;
  const resultAtomicFermions: boolean = fusionForm.get(
    'resultNuclides.atomicFermions'
  )?.value;

  this.query = sqlForm.get('coreQuery')?.value;

  kvp.push(new KeyValuePair({ key: 'doit', value: 'execute_query' }));
  kvp.push(
    new KeyValuePair({
      key: 'query',
      value: this.query
    })
  );
  kvp.push(
    new KeyValuePair({
      key: 'table_name',
      value: fusionForm.get('tableSet')?.value
    })
  );
  if (inputNeutrinos) {
    kvp.push(new KeyValuePair({ key: 'sql_tables[]', value: 'left' }));
  }
  if (noNeutrinos) {
    kvp.push(new KeyValuePair({ key: 'sql_tables[]', value: 'none' }));
  }
  if (outputNeutrinos) {
    kvp.push(new KeyValuePair({ key: 'sql_tables[]', value: 'right' }));
  }
  kvp.push(
    new KeyValuePair({
      key: 'nBorF1',
      value: formatSpinChoices(leftNuclearBosons, leftNuclearFermions)
    })
  );
  kvp.push(
    new KeyValuePair({
      key: 'aBorF1',
      value: formatSpinChoices(leftAtomicBosons, leftAtomicFermions)
    })
  );
  kvp.push(
    new KeyValuePair({
      key: 'nBorF2',
      value: formatSpinChoices(rightNuclearBosons, rightNuclearFermions)
    })
  );
  kvp.push(
    new KeyValuePair({
      key: 'aBorF2',
      value: formatSpinChoices(rightAtomicBosons, rightAtomicFermions)
    })
  );
  kvp.push(
    new KeyValuePair({
      key: 'nBorF',
      value: formatSpinChoices(
        resultNuclearBosons,
        resultNuclearFermions
      )
    })
  );
  kvp.push(
    new KeyValuePair({
      key: 'aBorF',
      value: formatSpinChoices(resultAtomicBosons, resultAtomicFermions)
    })
  );
  return kvp;
}
}
