import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ErrorHandler,
  importProvidersFrom
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { AppConfigService } from './app/core/config/app-config.service';
import { GlobalErrorHandler } from './app/core/global-error-handler';
import { ServerErrorInterceptor } from './app/core/server-error.interceptor';
import { globalFeature } from './app/state/global.state';
import { PageNotFoundComponent } from './app/page-not-found/page-not-found.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoComponent } from './app/demo/demo.component';

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
      import('./app/fusion/fusion.component').then((m) => m.FusionComponent)
  },
  {
    path: 'fission',
    loadComponent: () =>
      import('./app/fission/fission.component').then((m) => m.FissionComponent)
  },
  {
    path: 'testpage',
    loadComponent: () =>
      import('./app/testpage/testpage.pipe.component').then(
        (m) => m.TestpagePipeComponent
      )
  },
  {
    path: 'demo',
    component: DemoComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAppFn,
      multi: true,
      deps: [AppConfigService]
    },
    provideRouter(routes),

    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true
    },
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
