import { Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { TestpageHeadComponent } from './testpage/testpage.head.component';

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
  { path: 'testpage', pathMatch: 'full', component: TestpageHeadComponent },
  { path: '**', component: NotFoundComponent }
];
