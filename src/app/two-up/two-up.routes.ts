import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as twoUpState from '../state/two-up';
import { TwoUpHeadComponent } from './two-up.head.component'
import { ReportPagesHeadComponent } from '../shared/report-pages/report-pages.head.component';
import { DownloadService } from '../shared/download/download.service';
import { TwoUpService } from './two-up.service';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
export const TWO_UP_ROUTES: Routes = [
  {
    path: '',
    component: TwoUpHeadComponent,
    providers: [
      provideState(twoUpState.feature),
      provideEffects([twoUpState.effects]),
      {provide: TwoUpService, useClass: TwoUpService},
      {provide: HeaderProviderService, useClass: HeaderProviderService},
      { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
    ]
  },
  {
    path: 'reports',
    component: ReportPagesHeadComponent,
    providers: [
      provideState(twoUpState.feature),
      provideEffects([twoUpState.effects]),
      {provide: DownloadService, useClass: DownloadService}
    ]
  }
];
