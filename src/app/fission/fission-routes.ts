import { Routes } from '@angular/router';
import { FissionHeadComponent } from './fission-head.component';
import { ReportPagesHeadComponent } from '../shared/report-pages/report-pages.head.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { DownloadComponent } from '../shared/download/download.component';
import { DownloadService } from '../shared/download/download.service';
import * as fissionState from '../state/fission';
import { FissionService } from './fission.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
export const FISSION_ROUTES: Routes = [
  {
    path: '',
    component: FissionHeadComponent,
    providers: [
      provideState(fissionState.feature),
      provideEffects([fissionState.effects]),
      {provide: FissionService, useClass: FissionService},      
      { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
    ]
  },
  {
    path: 'reports',
    component: ReportPagesHeadComponent,
    providers: [
      provideState(fissionState.feature),
      provideEffects([fissionState.effects]),
      {provide: DownloadService, useClass: DownloadComponent}
    ]
  },
];
