import { Routes } from '@angular/router';
import { FissionHeadComponent } from './fission-head.component';
import { ReportPagesHeadComponent } from '../shared/report-pages/report-pages.head.component';

export const FISSION_ROUTES: Routes = [
  {
    path: '',
    component: FissionHeadComponent
  },
  {
    path: 'reports',
    component: ReportPagesHeadComponent
  }
];
