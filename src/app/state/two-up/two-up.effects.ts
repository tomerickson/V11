import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { NotificationComponent } from 'src/app/core/notification.component';
import { TwoUpService } from 'src/app/two-up/two-up.service';
import { TwoUpActions } from './two-up.actions';

export const fetchAllResultsEffect = createEffect(
  (actions$ = inject(Actions)) => {

    const svc= inject(TwoUpService)
    return actions$.pipe(
      ofType(TwoUpActions.fetchAllResults),
      switchMap((action) =>
        svc.getTwoUpResults(action.payload).pipe(
          map((html) => svc.parseTwoUpResults(html)),
          map((tables) =>
            TwoUpActions.loadAllResultsSuccess({ results: tables })
          ),
          catchError((error) =>
            of(TwoUpActions.loadAllResultsFailure({ error: error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const loadAllResultsErrorAlert = createEffect(
  () => {
    const notifier = inject(NotificationComponent);
    return inject(Actions).pipe(
      ofType(TwoUpActions.loadAllResultsFailure),
      tap(() => notifier.showClientError('No results found.'))
    );
  },
  { functional: true, dispatch: false }
);
