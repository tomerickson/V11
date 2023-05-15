import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { FusionActions } from './fusion.actions';

/* export const dummyEffect = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(FusionActions.fetchAllResults),
      tap(() => console.log('dummyEffect is running'))
    );
  },
  { functional: true, dispatch: false }
); */

export const fetchAllResultsEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const crud = inject(CrudService);
    return actions$.pipe(
      ofType(FusionActions.fetchAllResults),
      exhaustMap(action => crud.getFusionResults(action.payload)),
      map(html => crud.parseFusionResults(html)),
      map(tables => FusionActions.loadAllResultsSuccess({ results: tables })),
      catchError((error) =>
        of(FusionActions.loadAllResultsFailure({ error: error.message }))
      )
    );
  },
  { functional: true }
);

export const loadAllResultsErrorAlert = createEffect(
  () => {
    return inject(Actions).pipe(
      ofType(FusionActions.loadAllResultsFailure),
      tap(({ error }) => alert(error))
    );
  },
  { functional: true, dispatch: false }
);
