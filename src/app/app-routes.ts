import { Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
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
    pathMatch: 'full',
    loadChildren: () =>
      import('./fusion/fusion-routes').then((m) => m.FUSION_ROUTES)
  },
  /*   {
    path: 'fission',
    pathMatch: 'full',
    loadChildren: () =>
      import('./fision/fission-routes').then((m) => m.FISSION_ROUTES)
  }, */
  { path: 'testpage', pathMatch: 'full', component: TestpageHeadComponent },
  { path: '**', component: UnderConstructionComponent }
];
