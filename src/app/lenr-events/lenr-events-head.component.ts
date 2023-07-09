import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, from, map, of } from 'rxjs';
import { ILenrEventsRequest } from '../core/models/lenr-events-request.model';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { globalFeature } from '../state';
import * as eventStore from '../state/lenr-events';
import { LenrEventsFaceComponent } from './lenr-events-face/lenr-events-face.component';

@Component({
  selector: 'mfmp-lenr-events-head',
  standalone: true,
  imports: [CommonModule, LenrEventsFaceComponent],
  template: `
    <mfmp-lenr-events-face
      [categories]="categories | async"
      [eventCount]="eventCount | async"
      [maxId]="maxId | async"
      [description]="pageDescription | async"
      ></mfmp-lenr-events-face>
  `,
  styles: []
})
export class LenrEventsHeadComponent implements OnInit {
  store = inject(Store);
  headerService = inject(HeaderProviderService);
  categories!: Observable<string[]>;
  eventCount!: Observable<number>;
  maxId!: Observable<number>;
  pageDescription!: Observable<string>;
  derivedDescription!: Observable<string>;

  ngOnInit(): void {

    this.headerService.buildPageHeader('lenr-events');

    this.store.dispatch(
      eventStore.LenrEventActions.prefetch({ payload: Date.now() })
    );

    this.categories = this.store.select(
      eventStore.lenrEventsFeature.selectCategories
    );
    this.eventCount = this.store.select(
      eventStore.lenrEventsFeature.selectEventCount
    );
    this.maxId = this.store.select(
      eventStore.lenrEventsFeature.selectMaxEventId
    );
    this.pageDescription = this.store.select(
      globalFeature.selectPageDescription
    );


  }

  request: ILenrEventsRequest = {} as ILenrEventsRequest;
}
