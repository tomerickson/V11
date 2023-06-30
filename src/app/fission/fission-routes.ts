import { Routes } from '@angular/router';
import { FissionHeadComponent } from './fission-head.component';
import { ReportPagesHeadComponent } from '../shared/report-pages/report-pages.head.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { DownloadComponent } from '../shared/download/download.component';
import { DownloadService } from '../shared/download/download.service';
import * as fissionState from '../state/fission';
export const FISSION_ROUTES: Routes = [
  {
    path: '',
    component: FissionHeadComponent,
    providers: [
      provideState(fissionState.fissionFeature),
      provideEffects([fissionState.effects])
    ]
  },
  {
    path: 'reports',
    component: ReportPagesHeadComponent,
    providers: [
      provideState(fissionState.fissionFeature),
      provideEffects([fissionState.effects]),
      {provide: DownloadService, useClass: DownloadComponent}
    ]
  }
];
