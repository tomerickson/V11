import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { ReportPagesHeadComponent } from '../shared/report-pages/report-pages.head.component';
import * as state from '../state/all-results';
import { AllResultsHeadComponent } from './all-results-head.component';
import { AllResultsService } from './all-results.service';

export const ALL_RESULTS_ROUTES: Routes = [
  {
    path: '',
    component: AllResultsHeadComponent,
    providers: [
      provideState(state.feature),
      provideEffects([state.effects]),
      {provide: AllResultsService, useClass: AllResultsService},
      {provide: HeaderProviderService, useClass: HeaderProviderService}
    ]
  },
  {
    path: 'reports',
    component: ReportPagesHeadComponent,
    providers: [
      provideState(state.feature),
      provideEffects([state.effects]),
      {provide: AllResultsService, useClass: AllResultsService},
      {provide: HeaderProviderService, useClass: HeaderProviderService}
    ]
  }
];
