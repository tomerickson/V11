import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CascadesService } from 'src/app/cascades/cascades.service';
import { CascadesAllActions } from './actions';
import { NotificationComponent } from 'src/app/core/notification.component';

export const fetchAllResultsEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const service = inject(CascadesService);
    return actions$.pipe(
      ofType(CascadesAllActions.fetchAllResults),
      switchMap((action) =>
        service.getCascadesAllResults(action.payload).pipe(
          map((html) => service.parseCascadesAllResults(html)),
          map((link) =>
            CascadesAllActions.fetchAllResultsSuccess({ link: link })
          ),
          catchError((error) =>
            of(CascadesAllActions.fetchAllResultsFailure({ error: error }))
          )
        )
      )
    );
  },{functional: true}
);

export const fetchAllResultsErrorAlert = createEffect(
  () => {
    const notifier = inject(NotificationComponent);
    return inject(Actions).pipe(
      ofType(CascadesAllActions.fetchAllResultsFailure),
      tap(() => notifier.showClientError('No results found.'))
    );
  },
  {functional: true, dispatch: false}
);
