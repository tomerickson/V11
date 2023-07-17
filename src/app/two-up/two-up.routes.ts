import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as twoUpState from '../state/fusion';
import { TwoUpHeadComponent } from './two-up.head.component'
import { ReportPagesHeadComponent } from '../shared/report-pages/report-pages.head.component';
import { DownloadService } from '../shared/download/download.service';
export const TWO_UP_ROUTES: Routes = [
  {
    path: '',
    component: TwoUpHeadComponent,
    providers: [
      provideState(fusionState.fusionFeature),
      provideEffects([fusionState.effects])
    ]
  },
  {
    path: 'reports',
    component: ReportPagesHeadComponent,
    providers: [
      provideState(twoUpState.twoUpFeature),
      provideEffects([twoUpState.effects]),
      {provide: DownloadService, useClass: DownloadService}
    ]
  }
];
