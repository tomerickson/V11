import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ErrorHandler,
  importProvidersFrom
} from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, provideRouter } from '@angular/router';
import { provideEffects, EffectsModule } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { AppConfigService } from './app/core/config/app-config.service';
import { GlobalErrorHandler } from './app/core/global-error-handler';
import { ServerErrorInterceptor } from './app/core/server-error.interceptor';
import { DemoComponent } from './app/demo/demo.component';
import * as fusionState from './app/state/fusion';
import { globalFeature } from './app/state/global.state';
import { UnderConstructionComponent } from './app/under-construction/under-construction.component';

const initAppFn = (configService: AppConfigService) => {
  return () => configService.validateConfiguration();
};

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
      import('./app/fusion/fusion.head.component').then((m) => m.FusionHeadComponent),
      providers: [
        provideState(fusionState.fusionFeature),
        provideEffects(fusionState.FusionEffects)
      ]
  },
  {
    path: 'fission',
    loadComponent: () =>
      import('./app/fission/fission.component').then((m) => m.FissionComponent)
  },
  {
    path: 'testpage',
    loadComponent: () =>
      import('./app/testpage/testpage.head.component').then(
        (m) => m.TestpageHeadComponent
      )
  },
  {
    path: 'demo',
    component: DemoComponent
  },
  { path: '**', component: UnderConstructionComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAppFn,
      multi: true,
      deps: [AppConfigService]
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true
    },
    provideHttpClient(),
    provideRouter(routes),
    provideStore(),
    provideState(globalFeature),
    provideEffects(),
    provideStoreDevtools(),
    provideRouterStore(),
    importProvidersFrom(MatDialogModule),
    importProvidersFrom(MatSnackBarModule),
    importProvidersFrom(BrowserAnimationsModule)
  ]
}).catch((err) => console.log(err));
