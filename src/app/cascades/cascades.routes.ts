import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ReportPagesHeadComponent } from '../shared/report-pages/report-pages.head.component';
import { DownloadService } from '../shared/download/download.service';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { CascadesAllHeadComponent } from './cascades-all/cascades-all-head.component';
import * as cascadeState from '../state/cascades-all';
import { CascadesService } from './cascades.service';
export const CASCADE_ROUTES: Routes = [

    {path: '',
    component: CascadesAllHeadComponent,
    providers: [
      provideState(cascadeState.cascadesAllFeature),
      provideEffects([cascadeState.effects]),
      {provide: CascadesService, useClass: CascadesService},
      {provide: HeaderProviderService, useClass: HeaderProviderService}
    ]
  },
  {
    path: 'reports',
    component: ReportPagesHeadComponent,
    providers: [
      provideState(cascadeState.cascadesAllFeature),
      // provideEffects([cascadeState.effects]),
      {provide: DownloadService, useClass: DownloadService}
    ]
  }
];
