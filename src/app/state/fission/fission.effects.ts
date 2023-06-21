import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { NotificationComponent } from 'src/app/core/notification.component';
import { CrudService } from 'src/app/core/services/crud.service';
import { FissionActions } from './fission.actions';

export const fetchAllResultsEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const crud = inject(CrudService);
    return actions$.pipe(
      ofType(FissionActions.fetchAllResults),
      switchMap((action) =>
        crud.getFissionResults(action.payload).pipe(
          map((html) => crud.parseFissionResults(html)),
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
