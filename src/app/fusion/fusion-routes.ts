import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as fusionState from '../state/fusion';
import { FusionHeadComponent } from './fusion.head.component';
import { ReportPagesHeadComponent } from '../shared/report-pages/report-pages.head.component';
export const FUSION_ROUTES: Routes = [
  {
    path: '',
    component: FusionHeadComponent,
    providers: [
      provideState(fusionState.fusionFeature),
      provideEffects([fusionState.effects])
    ]
  },
  {
    path: 'reports',
    component: ReportPagesHeadComponent,
    providers: [
      provideState(fusionState.fusionFeature),
      provideEffects([fusionState.effects])
    ]
  }
];
