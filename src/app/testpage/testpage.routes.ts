import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { CustomPaginatorComponent } from '../shared/custom-paginator/custom-paginator.component';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import * as state from '../state/all-results';
import { TestpageHeadComponent } from './testpage.head.component';

export const TESTPAGE_ROUTES: Routes = [
  {
    path: '',
    component: TestpageHeadComponent,
    providers: [
      provideState(state.feature),
      provideEffects([state.effects]),
      { provide: HeaderProviderService, useClass: HeaderProviderService }
    ]
  },
  {
    path: 'paginator',
    component: CustomPaginatorComponent
  }
];
