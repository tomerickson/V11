import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { DownloadService } from '../shared/download/download.service';
import * as eventState from '../state/lenr-events';
import { LenrEventsDetailComponent } from './lenr-events-detail/lenr-events-detail.component';
import { LenrEventsHeadComponent } from './lenr-events-head.component';
import { EventServices } from './lenr-events.service';
import { HeaderProviderService } from '../shared/header/header.provider.service';

export const LENR_EVENTS_ROUTES: Routes = [
  {
    path: '',
    component: LenrEventsHeadComponent,
    providers: [
      provideState(eventState.lenrEventsFeature),
      provideEffects([eventState.effects]),
      {provide: EventServices, useClass: EventServices},
      {provide: HeaderProviderService, useClass: HeaderProviderService}
    ]
  },
  {
    path: 'details',
    component: LenrEventsDetailComponent,
    providers: [
      provideState(eventState.lenrEventsFeature),
      provideEffects([eventState.effects]),
      {provide: DownloadService, useClass: DownloadService},

    ]
  }
];
