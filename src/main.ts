import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { PageNotFoundComponent } from './app/page-not-found/page-not-found.component';
import { environment } from './environments/environment';

const routes: Routes = [
  // { path: 'svg', loadChildren: () => import('./svg/svg.module').then(m => m.SvgModule) }
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  {
    path: 'intro',
    loadChildren: () =>
      import('./app/intro/intro.module').then((m) => m.IntroModule)
  },
  {
    path: 'fusion',
    loadChildren: () =>
      import('./app/fusion/fusion.module').then((m) => m.FusionModule)
  },
  { path: '**', component: PageNotFoundComponent }
];

if (environment.production) {
  enableProdMode();
}
bootstrapApplication(AppComponent, {
  providers:[provideRouter(routes)]
})
.catch(err => console.error(err));