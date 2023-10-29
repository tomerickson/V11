import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { DownloadService } from '../shared/download/download.service';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import * as cascadeState from '../state/cascades-all';
import { CascadesAllHeadComponent } from './cascades-all/cascades-all-head.component';
import { CascadesSummaryHeadComponent } from './cascades-summary/cascades-summary-head.component';
import { CascadesService } from './cascades.service';
import { ReportPagesHeadComponent } from '../shared/report-pages/report-pages.head.component';
import { Cascades4HeadComponent } from './cascades4/cascades4-head.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

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
      { path: 'cascades-all', component: CascadesAllHeadComponent },
      { path: 'cascades4', component: Cascades4HeadComponent },
      { path: 'summary', component: CascadesSummaryHeadComponent },
      { path: 'reports', component: ReportPagesHeadComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
];
