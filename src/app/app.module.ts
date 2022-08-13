import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { entityConfig } from './entity-metadata';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

export function initializeApp() {
  return () => {
    return new Promise((resolve, reject) => {
      return resolve(true);
    });
  };
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EntityDataModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true
    }),
    StoreRouterConnectingModule.forRoot(),
    EntityDataModule.forRoot(entityConfig),
    CoreModule
  ],
  exports: [SharedModule],
  declarations: [AppComponent, PageNotFoundComponent, MenuComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
