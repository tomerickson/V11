import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import {
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
import { APP_ROUTES } from './app/app-routes';
import { AppComponent } from './app/app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { APP_CONFIG } from './app.config';
import { GlobalErrorHandler } from './app/core/global-error-handler';
import { NotificationComponent } from './app/core/notification.component';
import { ServerErrorInterceptor } from './app/core/server-error.interceptor';
import { CrudService } from './app/core/services/crud.service';
import { feature } from './app/state/global.state';

fetch('/assets/config/config.json')
  .then((response) => response.json())
  .then((config) => {
    if (config.production) {
      enableProdMode();
    }

    platformBrowserDynamic([{ provide: APP_CONFIG, useValue: config }]);

    bootstrapApplication(AppComponent, {
      providers: [
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
        provideEffects(),
        provideStoreDevtools(),
        provideRouterStore(),
        importProvidersFrom(MatDialogModule),
        importProvidersFrom(MatSnackBarModule),
        importProvidersFrom(BrowserAnimationsModule)
      ]
    }).catch((err) => console.log(err));
  });
