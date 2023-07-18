import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as twoUpState from '../state/two-up';
import { TwoUpHeadComponent } from './two-up.head.component'
import { ReportPagesHeadComponent } from '../shared/report-pages/report-pages.head.component';
import { DownloadService } from '../shared/download/download.service';
import { TwoUpService } from './two-up.service';
import { HeaderProviderService } from '../shared/header/header.provider.service';
export const TWO_UP_ROUTES: Routes = [
  {
    path: '',
    component: TwoUpHeadComponent,
    providers: [
      provideState(twoUpState.twoupFeature),
      provideEffects([twoUpState.effects]),
      {provide: TwoUpService, useClass: TwoUpService},
      {provide: HeaderProviderService, useClass: HeaderProviderService}
    ]
  },
  {
    path: 'reports',
    component: ReportPagesHeadComponent,
    providers: [
      provideState(twoUpState.twoupFeature),
      provideEffects([twoUpState.effects]),
      {provide: DownloadService, useClass: DownloadService}
    ]
  }
];
