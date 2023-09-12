import { Inject, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    catchError,
    exhaustMap,
    map,
    of,
    tap
} from 'rxjs';
import { APP_CONFIG } from 'src/app.config';
import { actions } from '.';
import { IAppConfig } from '../core/config/iapp-config.model';
import { NotificationComponent } from '../core/notification.component';

/**
 * Global effects
 */
export class GlobalEffects {
  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    private actions$: Actions
  ) {}

  /**
   * 
   * @returns configuration file as an Observable
   */
  getConfigs() {
    return of(this.config);
  }

  /**
   * Initialize the global state from the config file
   */
  initializeEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.initialize),
      exhaustMap(() =>
        this.getConfigs().pipe(
          map((config) => actions.initializeSuccess({ payload: config })),
          catchError(() => of(actions.initializeFailure))
        )
      )
    )
  );

  errorHandlerEffect = createEffect(() => {
    const notifier = inject(NotificationComponent);
    return inject(Actions).pipe(
      ofType(actions.initializeFailure),
      tap(() => notifier.showClientError('global initialization failed'))
    );
  });
}
