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
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { APP_ROUTES } from './app/app-routes';
import { AppComponent } from './app/app.component';
import { AppConfigService } from './app/core/config/app-config.service';
import { GlobalErrorHandler } from './app/core/global-error-handler';
import { ServerErrorInterceptor } from './app/core/server-error.interceptor';
import { globalFeature } from './app/state/global.state';

const initAppFn = (configService: AppConfigService) => {
  return () => configService.validateConfiguration();
};

const routes = APP_ROUTES;

/* const routes: Routes = [
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  {
    path: 'intro',
    loadComponent: () =>
      import('./app/intro/intro.component').then((m) => m.IntroComponent)
  },
  {
    path: 'fusion',
    providers: [
        provideState('fusion', fusionState.fusionReducer),
        provideEffects(fusionState.FusionEffects)
      ],
    loadComponent: () =>
      import('./app/fusion/fusion.head.component').then((m) => m.FusionHeadComponent),
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
 */
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

