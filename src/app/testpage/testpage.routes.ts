import { Routes } from '@angular/router';
import { TestpageHeadComponent } from './testpage.head.component';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
// import * as state from '../state/all-results';

export const TESTPAGE_ROUTES: Routes = [
  {
    path: '',
    component: TestpageHeadComponent,
    providers: [
      // provideState(state.feature),
      // provideEffects([state.effects]),
      { provide: HeaderProviderService, useClass: HeaderProviderService },
      { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
    ]
  }
];
