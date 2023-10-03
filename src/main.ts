import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ErrorHandler,
  enableProdMode,
  importProvidersFrom
} from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
// import  APP_CONFIG  from './app/core/config/app-config.service';
import { APP_ROUTES } from './app/app-routes';
import { AppComponent } from './app/app.component';
import { GlobalErrorHandler } from './app/core/global-error-handler';
import { NotificationComponent } from './app/core/notification.component';
import { ServerErrorInterceptor } from './app/core/server-error.interceptor';
import { CrudService } from './app/core/services/crud.service';
import { feature } from './app/state/global.state';
import { AppConfigService } from './app/core/config/app-config.service';
import { GlobalEffects } from './app/state/global.effects';

export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}

export function initializeApp(appInitService: AppConfigService) {
  return (): Promise<any> => {
    return appInitService.loadConfigFile();
  };
}
/*
fetch('/assets/config/config.json')
  .then((response) => response.json())
  .then((config) => {
    if (config.production) {
      enableProdMode();
    }

    
*/
// platformBrowserDynamic([{ provide: APP_CONFIG, useValue: AppConfig }]);
bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref,
      deps: [PlatformLocation]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfigService], multi: true
    },
    // {provide: APP_CONFIG, useClass: AppConfigService,
    // deps: [APP_BASE_HREF]},
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true
    },
    {
      provide: CrudService,
      useClass: CrudService
    },
    {
      provide: NotificationComponent,
      useClass: NotificationComponent
    },
    provideHttpClient(),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideStore(),
    provideState(feature),
    provideEffects([GlobalEffects]),
    provideStoreDevtools(),
    provideRouterStore(),
    importProvidersFrom(MatDialogModule),
    importProvidersFrom(MatSnackBarModule),
    importProvidersFrom(BrowserAnimationsModule)
  ]
}).catch((err) => console.log(err));
