import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { NotificationComponent } from 'src/app/core/notification.component';
import { CrudService } from 'src/app/core/services/crud.service';
import { FusionActions } from './fusion.actions';

export const fetchAllResultsEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const crud = inject(CrudService);
    return actions$.pipe(
      ofType(FusionActions.fetchAllResults),
      switchMap((action) =>
        crud.getFusionResults(action.payload, 'POST').pipe(
          map((html) => crud.parseFusionResults(html)),
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
