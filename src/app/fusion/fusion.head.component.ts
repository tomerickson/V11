import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription, from } from 'rxjs';
import { IElementDataModel } from '../core/models/element.data.model';
import { ILookupDataModel } from '../core/models/lookup..data.model';
import { CrudService } from '../core/services/crud.service';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { globalFeature } from '../state';
import { FusionFaceComponent } from './fusion.face.component';
import { FusionActions } from '../state/fusion';
import { FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'mfmp-fusion-head',
  template: `
    <mfmp-fusion-face
      [elements]="elements | async"
      [sortFields]="sortFields | async"
      (doit)="submit_query($event)"></mfmp-fusion-face>
  `,
  styles: [''],
  imports: [CommonModule, HttpClientModule, FusionFaceComponent],
  providers: [{ provide: HeaderProviderService }]
})
export class FusionHeadComponent implements OnInit, OnDestroy {
  store: Store = inject(Store);
  http: CrudService = inject(CrudService);

  elements: Observable<IElementDataModel[]> | null = null;
  sortFields: Observable<ILookupDataModel[]> | null = null;
  ready: BehaviorSubject<boolean> = new BehaviorSubject(false);
  formData: FormData | undefined;
  subscriptions: Subscription = new Subscription();
  submittable = false;

  readonly description =
    'This program ("Fusion.php") enables SQL commands to query the Fusion tables originally created from Dr Parkhomov\'s spreadsheets.';

  constructor(private headerService: HeaderProviderService) {}

  submit_query = (fusionForm: FormGroup): void => {
    this.formData = this.build_request_form(fusionForm);
    this.store.dispatch(FusionActions.fetchAllResults({ payload: this.formData }));
  };

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.elements = this.store.select(globalFeature.selectElements);
    this.sortFields = this.store.select(globalFeature.selectReactionSortFields);
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

  build_request_form(fusionForm: FormGroup): FormData {
    const formData: FormData = new FormData();
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
    formData.append('doit', 'execute_query');
    formData.append('query', fusionForm.get('coreQuery')?.value);
    formData.append('table_name', fusionForm.get('tableSet')?.value);
    if (inputNeutrinos) {
      formData.append('sql_tables[]', 'left');
    }
    if (noNeutrinos) {
      formData.append('sql_tables[]', 'none');
    }
    if (outputNeutrinos) {
      formData.append('sql_tables[]', 'right');
    }
    formData.append(
      'nBorF1',
      this.formatSpinChoices(leftNuclearBosons, leftNuclearFermions)
    );
    formData.append(
      'aBorF1',
      this.formatSpinChoices(leftAtomicBosons, leftAtomicFermions)
    );
    formData.append(
      'nBorF2',
      this.formatSpinChoices(rightNuclearBosons, rightNuclearFermions)
    );
    formData.append(
      'aBorF2',
      this.formatSpinChoices(rightAtomicBosons, rightAtomicFermions)
    );
    formData.append(
      'nBorF',
      this.formatSpinChoices(resultNuclearBosons, resultNuclearFermions)
    );
    formData.append(
      'aBorF',
      this.formatSpinChoices(resultAtomicBosons, resultAtomicFermions)
    );

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    return formData;
  }
}
