import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { ReportPagesHeadComponent } from '../shared/report-pages/report-pages.head.component';
import * as state from '../state/all-tables';
import { AllTablesHeadComponent } from './all-tables-head.component';
import { AllTablesService } from './all-tables.service';

export const ALL_TABLES_ROUTES: Routes = [
  {
    path: '',
    component: AllTablesHeadComponent,
    providers: [
      provideState(state.feature),
      provideEffects([state.effects]),
      {provide: AllTablesService, useClass: AllTablesService},
      {provide: HeaderProviderService, useClass: HeaderProviderService}
    ]
  },
  {
    path: 'reports',
    component: ReportPagesHeadComponent,
    providers: [
      provideState(state.feature),
      provideEffects([state.effects]),
      {provide: AllTablesService, useClass: AllTablesService},
      {provide: HeaderProviderService, useClass: HeaderProviderService}
    ]
  }
];
