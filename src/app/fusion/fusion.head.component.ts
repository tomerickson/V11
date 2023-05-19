import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IElementDataModel } from '../core/models/element-data.model';
import {
  IKeyValuePair,
  KeyValuePair
} from '../core/models/key-value-pair.model';
import { ILookupDataModel } from '../core/models/lookup.-data.model';
import { CrudService } from '../core/services/crud.service';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { globalFeature } from '../state';
import { FusionActions, fusionFeature } from '../state/fusion';
import { FusionFaceComponent } from './fusion.face.component';

@Component({
  standalone: true,
  selector: 'mfmp-fusion-head',
  template: `
    <mfmp-fusion-face
      [elements]="elements | async"
      [sortFields]="sortFields | async"
      [fusionResults]="(fusionResults | async) ?? []"
      [nuclideResults]="(nuclideResults | async) ?? []"
      [elementResults]="(elementResults | async) ?? []"
      (doit)="submit_query($event)"></mfmp-fusion-face>
  `,
  styles: [''],
  imports: [
    CommonModule,
    HttpClientModule,
    FusionFaceComponent
  ],
  providers: [{ provide: HeaderProviderService }]
})
export class FusionHeadComponent implements OnInit, OnDestroy {
  store: Store = inject(Store);
  http: CrudService = inject(CrudService);

  elements: Observable<IElementDataModel[]> | null = null;
  sortFields: Observable<ILookupDataModel[]> | null = null;
  fusionResults!: Observable<any[]>;
  nuclideResults!: Observable<any[]>;
  elementResults!: Observable<any[]>;
  ready: BehaviorSubject<boolean> = new BehaviorSubject(false);
  subscriptions: Subscription = new Subscription();
  submittable = false;

  readonly description =
    'This program ("Fusion.php") enables SQL commands to query the Fusion tables originally created from Dr Parkhomov\'s spreadsheets.';

  constructor(private headerService: HeaderProviderService) {}

  submit_query = (fusionForm: FormGroup): void => {
    const kvp = this.build_request_form(fusionForm);
    this.store.dispatch(FusionActions.fetchAllResults({ payload: kvp }));
  };

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.elements = this.store.select(globalFeature.selectElements);
    this.sortFields = this.store.select(globalFeature.selectReactionSortFields);
    this.fusionResults = this.store.select(fusionFeature.selectFusionResults)
    this.nuclideResults = this.store.select(fusionFeature.selectNuclideResults)
    this.elementResults = this.store.select(fusionFeature.selectElementResults);
    this.headerService.buildPageHeader('fusion');
    this.ready.next(true);
  }
  /**
   * Convert spin choices to a string for postback
  
   * @param bosons 
   * @param fermions 
   * @returns 
   * @remarks
   * If both choices are false convert them to true
   */
  formatSpinChoices = (bosons: boolean, fermions: boolean): string => {
    return bosons && fermions ? 'bf' : bosons ? 'b' : fermions ? 'f' : 'bf';
  };

  /**
   * map the formgroup to an array of key-value pairs
   * to be processed upstream
   * @param fusionForm
   * @returns KeyValuePairs[]
   */
  build_request_form(fusionForm: FormGroup): IKeyValuePair[] {
    let kvp = new Array<IKeyValuePair>();
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

    kvp.push(new KeyValuePair({ key: 'doit', value: 'execute_query' }));
    kvp.push(
      new KeyValuePair({
        key: 'query',
        value: fusionForm.get('coreQuery')?.value
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
        value: this.formatSpinChoices(leftNuclearBosons, leftNuclearFermions)
      })
    );
    kvp.push(
      new KeyValuePair({
        key: 'aBorF1',
        value: this.formatSpinChoices(leftAtomicBosons, leftAtomicFermions)
      })
    );
    kvp.push(
      new KeyValuePair({
        key: 'nBorF2',
        value: this.formatSpinChoices(rightNuclearBosons, rightNuclearFermions)
      })
    );
    kvp.push(
      new KeyValuePair({
        key: 'aBorF2',
        value: this.formatSpinChoices(rightAtomicBosons, rightAtomicFermions)
      })
    );
    kvp.push(
      new KeyValuePair({
        key: 'nBorF',
        value: this.formatSpinChoices(
          resultNuclearBosons,
          resultNuclearFermions
        )
      })
    );
    kvp.push(
      new KeyValuePair({
        key: 'aBorF',
        value: this.formatSpinChoices(resultAtomicBosons, resultAtomicFermions)
      })
    );
    return kvp;
  }
}
