import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ILenrEventsLookup } from '../core/models/lenr-events-lookup.model';
import { LenrEventsRequest } from '../core/models/lenr-events-request.model';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import * as appState from '../state';
import * as eventStore from '../state/lenr-events';
import { LenrEventsFaceComponent } from './lenr-events-face/lenr-events-face.component';
import { NotificationComponent } from '../core/notification.component';
import { ILenrEventDetail } from '../core/models/lenr-event-detail.model';

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
      [loading]="loading | async"
      [ready]="ready | async"
      [event]="event ? (event | async) : null"
      (searcher)="search($event)"
      (fetcher)="fetch($event)"></mfmp-lenr-events-face>
  `,
  styles: []
})
export class LenrEventsHeadComponent implements OnInit {
  store = inject(Store);
  notifier = inject(NotificationComponent);
  headerService = inject(HeaderProviderService);
  categories: Observable<string[]> = of(['']);
  eventCount!: Observable<number>;
  eventList: Observable<ILenrEventsLookup[]> | null = null;
  event: Observable<ILenrEventDetail> | null = null;
  maxId!: Observable<number>;
  loading!: Observable<boolean> | null;
  ready!: Observable<boolean> | null;
  pageDescription!: Observable<string>;
  payload!: LenrEventsRequest;

  constructor() {
    this.loading = of(false);
    this.payload = new LenrEventsRequest();
  }
  ngOnInit(): void {
    this.headerService.buildPageHeader('lenr-events');

    const now = new Date();
    const year = now.getFullYear();
    this.payload.s_Author = '';
    this.payload.s_Category = '';
    this.payload.s_Index_from = String(1);
    this.payload.s_Index_to = String(1);
    this.payload.s_Keywords = [''];
    this.payload.s_Title = '';
    this.payload.s_Year_from = String(year);
    this.payload.s_Year_to = String(year);
    this.payload.r_id_copy = '';
    this.payload.doit = 'refresh';
    this.store.dispatch(
      eventStore.actions.prefetch({ payload: this.payload })
    );

    this.categories = this.store.select(
      eventStore.feature.selectCategories
    );
    this.eventCount = this.store.select(
      eventStore.feature.selectEventCount
    );
    this.maxId = this.store.select(
      eventStore.feature.selectMaxEventId
    );
    this.eventList = this.store.select(
      eventStore.feature.selectLenrEvents
    );
    this.loading = this.store.select(
      eventStore.feature.selectLoading
    );
    this.ready = this.store.select(eventStore.feature.selectReady);
    this.event = this.store.select(
      eventStore.feature.selectCurrentEvent
    );
    this.pageDescription = this.store.select(
      appState.feature.selectPageDescription
    );
  }

  search(request: LenrEventsRequest): void {
    this.store.dispatch(
      eventStore.actions.fetchSearchResults({ payload: request })
    );
  }

  fetch(request: LenrEventsRequest): void {
    this.store.dispatch(
      eventStore.actions.loadEventDetail({ payload: request })
    );
  }
}
