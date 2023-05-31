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
import { provideRouter, withComponentInputBinding } from '@angular/router';
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
import { NotificationComponent } from './app/core/notification.component';

const initAppFn = (configService: AppConfigService) => {
  return () => configService.validateConfiguration();
};

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
    {
      provide: NotificationComponent, useClass: NotificationComponent
    },
    provideHttpClient(),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
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

