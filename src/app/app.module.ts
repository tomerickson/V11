import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NotificationComponent } from "./core/notification.component";
import { DemoComponent } from './demo/demo.component';
import { SharedComponent } from './shared/shared.component';

/*
import { CommonModule } from '@angular/common';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  provideHttpClient
} from '@angular/common/http';
import { enableProdMode, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { GlobalErrorHandler } from './core/global-error-handler';
import { NotificationService } from './core/notification.service';
import { ServerErrorInterceptor } from './core/server-error.interceptor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
if (environment.production) {
  enableProdMode();
}

const routes: Routes = [
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  {
    path: 'intro',
    loadComponent: () =>
      import('./intro/intro.component').then((m) => m.IntroComponent)
  },
  {
    path: 'fusion',
    loadComponent: () =>
      import('./fusion/fusion.component').then((m) => m.FusionComponent),
    providers: [
      provideState('fusion', fusionState),
      provideEffects()
    ]
  },
  {
    path: 'testpage',
    loadComponent: () =>
      import('./testpage/testpage.pipe.component').then(
        (m) => m.TestpagePipeComponent
      )
  },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    StoreModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [
    provideHttpClient(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor },
    { provide: NotificationService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
*/
@NgModule({
  imports: [MatSnackBarModule, MatDialogModule],
  providers: [MatSnackBarModule, MatDialogModule, NotificationComponent],
  declarations: [
    DemoComponent,
    SharedComponent
  ],
})
export class AppModule {}