import { APP_INITIALIZER, Inject, inject, Injectable } from '@angular/core';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, tap } from 'rxjs';

import { Action } from '@ngrx/store';
import { actions } from '.';
import { AppConfigService } from '../core/config/app-config.service';
import { IAppConfig } from '../core/config/iapp-config.model';
import { NotificationComponent } from '../core/notification.component';

/**
 * Global effects
 */
@Injectable({ providedIn: 'root' })
export class GlobalEffects implements OnInitEffects {
  readonly appService: AppConfigService;
  actions$: Actions;
  config!: IAppConfig;

  constructor() {
    this.appService = inject(AppConfigService);
    this.actions$ = inject(Actions);
    this.config = this.appService.config;
  }

  ngrxOnInitEffects(): Action {
    console.log('GlobalEffects.config', this.appService.version);
    return { type: '[Global API] Initialize' }; // actions.initialize;
  }

  /**
   * Initialize the global state from the config file
   */
  initializeEffect = createEffect((actions$ = inject(Actions)) => {
    const service = inject(AppConfigService);
    return actions$.pipe(
      ofType(actions.initialize),
      map(() => actions.initializeSuccess({ payload: service.config })),
      catchError(() => of(actions.initializeFailure))
    );
  });

  errorHandlerEffect = createEffect(() => {
    const notifier = inject(NotificationComponent);
    return inject(Actions).pipe(
      ofType(actions.initializeFailure),
      tap(() => notifier.showClientError('global initialization failed'))
    );
  });
}
