import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { enableProdMode, ErrorHandler } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { AppComponent } from './app/app.component';
import { GlobalErrorHandler } from './app/core/global-error-handler';
import { ServerErrorInterceptor } from './app/core/server-error.interceptor';
import { PageNotFoundComponent } from './app/page-not-found/page-not-found.component';
import { TestpagePipeComponent } from './app/testpage/testpage.pipe.component';
import { environment } from './environments/environment';
import { CommonModule } from '@angular/common';

const routes: Routes = [
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
      // provideState('fusion', fusionState),
      // provideEffects()
    ]
  },
  {
    path: 'testpage',
    loadComponent: () =>
      import('./app/testpage/testpage.pipe.component').then(
        (m) => m.TestpagePipeComponent
      )
  },

  { path: '**', component: PageNotFoundComponent }
];

if (environment.production) {
  enableProdMode();
}
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor },
    provideAnimations(),
    provideRouter(routes),
    provideStore()
  ]
}).catch((err) => console.error(err));
