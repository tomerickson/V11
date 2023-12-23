import { Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AllResultsService } from './all-results/all-results.service';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'intro'
  },
  {
    path: 'intro',
    pathMatch: 'full',
    component: IntroComponent
  },

  // Lazy Loading another Routing Config
  {
    path: 'fusion',
    loadChildren: () =>
      import('./fusion/fusion-routes').then((m) => m.FUSION_ROUTES)
  },
  {
    path: 'fission',
    loadChildren: () =>
      import('./fission/fission-routes').then((m) => m.FISSION_ROUTES)
  },
  {
    path: 'lenr-events',
    loadChildren: () =>
      import('./lenr-events/lenr-events.routes').then(
        (m) => m.LENR_EVENTS_ROUTES
      )
  },
  {
    path: 'two-up',
    loadChildren: () =>
      import('./two-up/two-up.routes').then((m) => m.TWO_UP_ROUTES)
  },
  {
    path: 'cascades',
    loadChildren: () =>
      import('./cascades/cascades.routes').then((m) => m.CASCADE_ROUTES)
  },
  {
    path: 'all-tables',
    loadChildren: () =>
      import('./all-tables/all-tables.routes').then((m) => m.ALL_TABLES_ROUTES)
  },
  {
    path: 'all-results',
    loadChildren: () =>
      import('./all-results/all-results.routes').then(
        (m) => m.ALL_RESULTS_ROUTES
      )
  },
  {
    path: 'notes',
    loadChildren: () =>
      import('./notes/notes.routes').then((m) => m.NOTES_ROUTES)
  },
  {
    path: 'element-data',
    loadChildren: () =>
      import('./element-data/element-data.routes').then(
        (m) => m.ELEMENT_DATA_ROUTES
      )
  },
  {
    path: 'tables-in-detail',
    loadChildren: () =>
      import('./tables-in-detail/table-in-detail.routes').then(
        (m) => m.TABLES_IN_DETAIL_ROUTES
      )
  },
  {
    path: 'testpage',
    loadChildren: () =>
      import('./testpage/testpage.routes').then((m) => m.TESTPAGE_ROUTES)
  },
  { path: '**', component: NotFoundComponent }
];
