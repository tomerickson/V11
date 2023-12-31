import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { HeaderProviderService } from '../shared/header/header.provider.service';
// import * as state from '../state/all-results';
import { TestpageHeadComponent } from './testpage.head.component';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher
} from '@angular/material/core';

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
