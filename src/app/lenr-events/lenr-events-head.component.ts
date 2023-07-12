import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  ILenrEventsRequest,
  LenrEventsRequest
} from '../core/models/lenr-events-request.model';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { globalFeature } from '../state';
import * as eventStore from '../state/lenr-events';
import { LenrEventsFaceComponent } from './lenr-events-face/lenr-events-face.component';
import { ILenrEventsLookup } from '../core/models/lenr-events-lookup.model';

@Component({
  selector: 'mfmp-lenr-events-head',
  standalone: true,
  imports: [CommonModule, LenrEventsFaceComponent],
  template: `
    <mfmp-lenr-events-face
      [categories]="categories | async"
      [eventCount]="eventCount | async"
      [eventList]="eventList | async"
      [maxId]="maxId | async"
      [description]="pageDescription | async"
      (searcher)="search($event)"></mfmp-lenr-events-face>
  `,
  styles: []
})
export class LenrEventsHeadComponent implements OnInit {
  store = inject(Store);
  headerService = inject(HeaderProviderService);
  categories: Observable<string[]> = of(['']);
  eventCount!: Observable<number>;
  eventList!: Observable<ILenrEventsLookup[]>;
  maxId!: Observable<number>;
  pageDescription!: Observable<string>;

  ngOnInit(): void {
    this.headerService.buildPageHeader('lenr-events');

    const payload = new LenrEventsRequest();
    const now = new Date();
    const year = now.getFullYear();
    payload.s_Author = '';
    payload.s_Category = '';
    payload.s_Index_from = String(1);
    payload.s_Index_to = String(1);
    payload.s_Keywords = [''];
    payload.s_Title = '';
    payload.s_Year_from = String(year);
    payload.s_Year_to = String(year);
    payload.doit = 'refresh';
    this.store.dispatch(
      eventStore.LenrEventActions.prefetch({ payload: payload })
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
    this.eventList = this.store.select(
      eventStore.lenrEventsFeature.selectLenrEvents
    );
    this.pageDescription = this.store.select(
      globalFeature.selectPageDescription
    );
  }

  search(request: LenrEventsRequest): void {
    this.store.dispatch(
      eventStore.LenrEventActions.fetchSearchResults({ payload: request })
    );
  }
}
