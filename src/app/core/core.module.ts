export function init_app(appLoadService: AppInitService) {
  return () => appLoadService.init();
}

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppInitService } from './app-init';


@NgModule({

  imports: [HttpClientModule],
  providers: [
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [AppInitService],
      multi: true
    }
  ],
})
export class CoreModule { }
