import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  of,
  pipe,
  withLatestFrom
} from 'rxjs';
import { CrudService } from 'src/app/core/services/crud.service';
import { FusionActions} from './fusion.actions';
import { fusionFeature } from './fusion.state';

/* export const fetchAllResultsEffect = createEffect(
  (actions$ = inject(Actions), crud = inject(CrudService)) => {
    return actions$.pipe(
      ofType(store.FusionActions.fetchAllResults),
      withLatestFrom(store.fusionFeature.selectFormData),
      pipe(
        map((form) => crud.getFusionResults(form)),
        pipe(
          map((tables) =>
            store.FusionActions.loadAllResultsSuccess({ results: tables })
          )
        ),
        catchError((error) =>
          of(store.FusionActions.loadAllResultsFailure(error))
        )
      )
    );
  },
  { functional: true }
); */

export const fetchAllResultsEffect = createEffect(
  (actions$ = inject(Actions), crud = inject(CrudService)) => {
    return actions$.pipe(
      ofType(FusionActions.fetchAllResults),
      withLatestFrom(fusionFeature.selectFormData),
      pipe(
        map((form) => crud.getFusionResults(form)),
        pipe(
          map((tables) =>
            FusionActions.loadAllResultsSuccess({ results: tables })
          )
        ),
        catchError((error) =>
          of(FusionActions.loadAllResultsFailure(error))
        )
      )
    );
  },
  { functional: true }
);
