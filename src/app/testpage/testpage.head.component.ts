import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TestPageFaceComponent } from './testpage.face.component';
import { Store } from '@ngrx/store';
import { globalFeature } from '../state/global.state';
import { IElementDataModel } from '../core/models/element-data.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'dummy',
    standalone: true,
    template: `<p>test page head works</p>
    <mfmp-testpage [elements]="elements | async"></mfmp-testpage>`,
    imports: [CommonModule, TestPageFaceComponent]
})
export class TestpageHeadComponent
{
  store = inject(Store)
  elements: Observable<IElementDataModel[]> | null;

  constructor() {
  this.elements = this.store.select(globalFeature.selectElements);
}
}
