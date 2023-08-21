import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementDataFaceComponent } from './element-data-face.component';
import * as globalState from '../state/';
import * as featureState from '../state/element-data';
import { Store } from '@ngrx/store';
import { IElementDataModel } from '../core/models/element-data.model';
import { Observable } from 'rxjs';
import { ElementDataResultsModel } from '../core/models/element-data-results.model';
import { IElementDataFormModel } from '../core/models/element-data-form.model';

@Component({
  selector: 'mfmp-element-data-head',
  standalone: true,
  imports: [CommonModule, ElementDataFaceComponent],
  template: `
    <mfmp-element-data-face
      [elementList]="elementsList | async"
      [results]="results"
      [elements]="elements | async"
      [radioNuclides]="radioNuclides | async"
      [nuclides]="nuclides | async"
      (change)="handleChange($event)"></mfmp-element-data-face>
  `,
  styles: []
})
export class ElementDataHeadComponent implements OnInit {
  store = inject(Store);
  elementsList!: Observable<IElementDataModel[]>;
  results!: Observable<ElementDataResultsModel | null>;
  elements!: Observable<any[]>;
  nuclides!: Observable<any[]>;
  radioNuclides!: Observable<any[]>;

  ngOnInit(): void {
    this.elementsList = this.store.select(globalState.feature.selectElements);
    this.elements = this.store.select(featureState.feature.selectElements);
    this.nuclides = this.store.select(featureState.feature.selectNuclides);
    this.radioNuclides = this.store.select(
      featureState.feature.selectRadioNuclides
    );
  }

  handleChange(value: string) {
    const payload = {} as IElementDataFormModel;
    payload.doit = 'get_element';
    payload.ZKEY = value;
    this.store.dispatch(
      featureState.actions.loadAllResults({ payload: payload })
    );
  }
}
