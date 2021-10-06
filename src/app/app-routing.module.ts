import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SvgComponent } from './svg/svg.component';

const routes: Routes = [
  // { path: 'svg', loadChildren: () => import('./svg/svg.module').then(m => m.SvgModule) }
  { path: '', component: AppComponent, pathMatch: 'full' },
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
