import { Routes } from '@angular/router';
import { TestpageHeadComponent } from './testpage.head.component';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { ErrorStateMatcher, MatNativeDateModule, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// import * as state from '../state/all-results';

export const TESTPAGE_ROUTES: Routes = [
  {
    path: '',
    component: TestpageHeadComponent,
    providers: [
      // provideState(state.feature),
      // provideEffects([state.effects]),

          // See angular issue #48350
      importProvidersFrom(ReactiveFormsModule.withConfig({ callSetDisabledState: 'whenDisabledForLegacyCode' })),
      importProvidersFrom(MatNativeDateModule),
      { provide: HeaderProviderService, useClass: HeaderProviderService },
      { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
    ]
  }
];
