import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { PageNotFoundComponent } from './app/page-not-found/page-not-found.component';
import { TestpagePipeComponent } from './app/testpage/testpage.pipe.component';
import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
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
      import('./app/fusion/fusion.component').then((m) => m.FusionComponent),
      providers: [
        provideState(),
        provideEffects()
      ]
  },
  { path: 'testpage', component: TestpagePipeComponent },
  { path: '**', component: PageNotFoundComponent }
];

if (environment.production) {
  enableProdMode();
}
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(),
    provideAnimations(),
    provideRouter(routes),
    provideStore()
  ]
}).catch((err) => console.error(err));
