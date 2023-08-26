import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import * as localState from '../state/tables-in-detail';
import { TablesInDetailHeadComponent } from './tables-in-detail-head.component';
import { TablesInDetailService } from './tables-in-detail.service';

export const TABLES_IN_DETAIL_ROUTES: Routes = [
  {
    path: '',
    component: TablesInDetailHeadComponent,
    providers: [
      provideState(localState.feature),
      provideEffects([localState.effects]),
      {provide: HeaderProviderService, useClass: HeaderProviderService},
      {provide: TablesInDetailService, useClass: TablesInDetailService},
    ]
  }
];
