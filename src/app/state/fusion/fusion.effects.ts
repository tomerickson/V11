import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { NotificationComponent } from 'src/app/core/notification.component';
import { FusionService } from 'src/app/fusion/fusion.service';
import { FusionActions } from './fusion.actions';

export const fetchAllResultsEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const svc = inject(FusionService);
    return actions$.pipe(
      ofType(FusionActions.fetchAllResults),
      switchMap((action) =>
        svc.getFusionResults(action.payload).pipe(
          map((html) => svc.parseFusionResults(html)),
          map((tables) =>
            FusionActions.loadAllResultsSuccess({ results: tables })
          ),
          catchError((error) =>
            of(FusionActions.loadAllResultsFailure({ error: error }))
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
      ofType(FusionActions.loadAllResultsFailure),
      tap(() => notifier.showClientError('No results found.'))
    );
  },
  { functional: true, dispatch: false }
);
