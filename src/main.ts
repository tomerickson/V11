import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { PageNotFoundComponent } from './app/page-not-found/page-not-found.component';
import { TestpageComponent } from './app/testpage/testpage.component';
import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';
const routes: Routes = [
  // { path: 'svg', loadChildren: () => import('./svg/svg.module').then(m => m.SvgModule) }
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  {
    path: 'intro',
    loadComponent: () =>
      import('./app/intro/intro.component').then((m) => m.IntroComponent)
  },
  {
    path: 'fusion',
    loadComponent: () =>
      import('./app/fusion/fusion.component').then((m) => m.FusionComponent)
  },
  { path: 'testpage', component: TestpageComponent },
  { path: '**', component: PageNotFoundComponent }
];

if (environment.production) {
  enableProdMode();
}
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(),
    importProvidersFrom([BrowserAnimationsModule]),
    provideRouter(routes)
  ]
}).catch((err) => console.error(err));
