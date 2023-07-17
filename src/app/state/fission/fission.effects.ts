import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { NotificationComponent } from 'src/app/core/notification.component';
import { FissionService } from 'src/app/fission/fission.service';
import { FissionActions } from './fission.actions';

export const fetchAllResultsEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const svc = inject(FissionService);
    return actions$.pipe(
      ofType(FissionActions.fetchAllResults),
      switchMap((action) =>
        svc.getFissionResults(action.payload).pipe(
          map((html) => svc.parseFissionResults(html)),
          map((tables) =>
            FissionActions.loadAllResultsSuccess({ results: tables })
          ),
          catchError((error) =>
            of(FissionActions.loadAllResultsFailure({ error: error }))
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
      ofType(FissionActions.loadAllResultsFailure),
      tap(() => notifier.showClientError('No results found.'))
    );
  },
  { functional: true, dispatch: false }
);
