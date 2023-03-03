

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  APP_INITIALIZER, ErrorHandler,
  importProvidersFrom
} from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { AppConfigService } from './app/core/config/app-config.service';
import { GlobalErrorHandler } from './app/core/global-error-handler';
import { NotificationService } from './app/core/notification.service';
import { ServerErrorInterceptor } from './app/core/server-error.interceptor';
import { PageNotFoundComponent } from './app/page-not-found/page-not-found.component';

const initAppFn = (configService: AppConfigService) => {
  return (() => configService.validateConfiguration());
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

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule,
      MatSnackBarModule,
      MatDialogModule
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initAppFn,
      multi: true,
      deps: [AppConfigService]
    },
    {provide: NotificationService},
    provideRouter(routes),

    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true
    }
  ]
}).catch((err) => console.log(err));
