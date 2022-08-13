import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SvgComponent } from './svg/svg.component';

const routes: Routes = [
  // { path: 'svg', loadChildren: () => import('./svg/svg.module').then(m => m.SvgModule) }
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  {
    path: 'intro',
    loadChildren: () =>
      import('./intro/intro.module').then((m) => m.IntroModule)
  },
  { path: 'svg', component: SvgComponent },
  {
    path: 'fusion',
    loadChildren: () =>
      import('./fusion/fusion.module').then((m) => m.FusionModule)
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
