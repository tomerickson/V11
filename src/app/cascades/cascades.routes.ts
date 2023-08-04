import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ReportPagesHeadComponent } from '../shared/report-pages/report-pages.head.component';
import { DownloadService } from '../shared/download/download.service';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { CascadesAllHeadComponent } from './cascades-all/cascades-all-head.component';
import * as cascadeState from '../state/cascades-all';
import { CascadesService } from './cascades.service';
import { CascadesSummaryFaceComponent } from './cascades-summary/cascades-summary.component';
import { CascadesSummaryHeadComponent } from './cascades-summary/cascades-summary-head.component';
export const CASCADE_ROUTES: Routes = [
  {
    path: '',
    component: CascadesAllHeadComponent,
    providers: [
      provideState(cascadeState.cascadesAllFeature),
      provideEffects([cascadeState.effects]),
      { provide: CascadesService, useClass: CascadesService },
      { provide: HeaderProviderService, useClass: HeaderProviderService }
    ]
  },
  {
    path: 'summary',
    component: CascadesSummaryHeadComponent,
    providers: [
      provideState(cascadeState.cascadesAllFeature),
      provideEffects(cascadeState.effects)
    ]
  },
  {
    path: 'reports',
    component: ReportPagesHeadComponent,
    providers: [
      provideState(cascadeState.cascadesAllFeature),
      // provideEffects([cascadeState.effects]),
      { provide: DownloadService, useClass: DownloadService }
    ]
  }
];
