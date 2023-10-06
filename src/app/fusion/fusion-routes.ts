import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as fusionState from '../state/fusion';
import { FusionHeadComponent } from './fusion-head.component';
import { ReportPagesHeadComponent } from '../shared/report-pages/report-pages.head.component';
import { DownloadService } from '../shared/download/download.service';
import { FusionService } from './fusion.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
export const FUSION_ROUTES: Routes = [
  {
    path: '',
    component: FusionHeadComponent,
    providers: [
      provideState(fusionState.feature),
      provideEffects([fusionState.effects]),
      {provide: FusionService, useClass: FusionService}
    ]
  },
  {
    path: 'reports',
    component: ReportPagesHeadComponent,
    providers: [
      provideState(fusionState.feature),
      provideEffects([fusionState.effects]),
      {provide: DownloadService, useClass: DownloadService},
      { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
    ]
  }
];
