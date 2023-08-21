import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { ReportPagesHeadComponent } from '../shared/report-pages/report-pages.head.component';
import * as state from '../state/element-data';
import { ElementDataHeadComponent } from './element-data-head.component';
import { ElementDataService } from './element-data.service';

export const ELEMENT_DATA_ROUTES: Routes = [
  {
    path: '',
    component: ElementDataHeadComponent,
    providers: [
      provideState(state.feature),
      provideEffects([state.effects]),
      {provide: ElementDataService, useClass: ElementDataService},
      {provide: HeaderProviderService, useClass: HeaderProviderService}
    ]
  },
  {
    path: 'reports',
    component: ReportPagesHeadComponent,
    providers: [
      provideState(state.feature),
      provideEffects([state.effects]),
      {provide: ElementDataService, useClass: ElementDataService},
      {provide: HeaderProviderService, useClass: HeaderProviderService}
    ]
  }
];
