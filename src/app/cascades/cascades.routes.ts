import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { DownloadService } from '../shared/download/download.service';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import * as cascadeState from '../state/cascades-all';
import { CascadesAllHeadComponent } from './cascades-all/cascades-all-head.component';
import { CascadesService } from './cascades.service';
import { Cascades4HeadComponent } from './cascades4/cascades4-head.component';

export const CASCADE_ROUTES: Routes = [
  {
    path: '',
    providers: [
      provideState(cascadeState.feature),
      provideEffects([cascadeState.effects]),
      { provide: CascadesService, useClass: CascadesService },
      { provide: HeaderProviderService, useClass: HeaderProviderService },
      { provide: DownloadService, useClass: DownloadService },
      {
        provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
        useValue: { appearance: 'outline' }
      }
    ],
    children: [
      {
        path: 'cascades-all',
        component: CascadesAllHeadComponent,
        // children: [{ path: 'reports', redirectTo: 'reports' }]
      },
      {
        path: 'cascades4',
        component: Cascades4HeadComponent,
        children: [{ path: 'reports', redirectTo: 'reports' }]
      },
      //{ path: 'summary', component: CascadesSummaryHeadComponent },
      // { path: 'reports', component: ReportPagesHeadComponent }
    ]
  },
  { path: '**', redirectTo: 'intro',  pathMatch: 'full'}
];
