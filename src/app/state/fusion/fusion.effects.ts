import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { IFusionCompositeResults } from 'src/app/core/models/fusion-composite-results.model';
import { CrudService } from 'src/app/core/services/crud.service';
import * as store from '.';

 const fetchAllResultsEffect = createEffect(
  (actions$ = inject(Actions), crud = inject(CrudService)) => {
    return actions$.pipe(
      ofType(store.FusionActions.fetchAllResults),
      withLatestFrom(store.fusionFeature.selectFormData),
      mergeMap((formData) => {
        debugger;
        return crud.getFusionResults(formData).pipe(
          map((results: IFusionCompositeResults) =>
            store.FusionActions.loadAllResultsSuccess({ results })
          ),
          catchError((error) =>
            of(store.FusionActions.loadAllResultsFailure({ error }))
          )
        );
      })
    );
  },
  { functional: true }
);

export const FusionEffects = {fetchAllResultsEffect}