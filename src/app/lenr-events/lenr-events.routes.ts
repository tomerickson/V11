import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { DownloadService } from '../shared/download/download.service';
import * as eventState from '../state/lenr-events';
import { LenrEventsDetailComponent } from './lenr-events-detail/lenr-events-detail.component';
import { LenrEventsHeadComponent } from './lenr-events-head.component';
import { EventServices } from './lenr-events.service';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { LenrEventsPageScraperService } from './lenr-events-page-scraper.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

export const LENR_EVENTS_ROUTES: Routes = [
  {
    path: '',
    component: LenrEventsHeadComponent,
    providers: [
      provideState(eventState.feature),
      provideEffects([eventState.effects]),
      {provide: EventServices, useClass: EventServices},
      {provide: HeaderProviderService, useClass: HeaderProviderService},
      {provide: LenrEventsPageScraperService, useClass: LenrEventsPageScraperService},
      { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
    ]
  },
  {
    path: 'details',
    component: LenrEventsDetailComponent,
    providers: [
      provideState(eventState.feature),
      provideEffects([eventState.effects]),
      {provide: DownloadService, useClass: DownloadService},

    ]
  }
];
