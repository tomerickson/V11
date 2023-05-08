import { Actions, createEffect, ofType } from "@ngrx/effects";
import { fusionActions } from ".";
import { catchError, exhaustMap, map, of } from "rxjs";
import { Injectable, inject } from "@angular/core";
import { CrudService } from "src/app/core/services/crud.service";
import { FusionActions } from "./fusion.actions";

/**
 * Effects
 */

export const fetchFusionResults = createEffect(
    (actions$ = inject(Actions), crud = inject(CrudService)) => {
    return actions$.pipe(
        ofType(fusionActions.fetchAllResults),
        // tap(({payload}) => {})),
        exhaustMap((payload) => 
        crud.getFusionResults(payload).pipe(map((results:string) => 
        fusionActions.loadAllResultsSuccess({results[0], results[1], results[2]})),
        catchError((error) => of(FusionActions.loadAllResultsFailure(error)))
        )
        )
    )
    },{functional: true});

// @Injectable()
/* export class FusionEffects {

    actions: Actions = inject(Actions);
    crud: CrudService = inject(CrudService);

 fetchFusionTables$ = createEffect(() => this.actions.pipe(
    ofType()
    const http = inject(CrudService);
    return actions$.pipe(
      ofType(FusionActions.fetchAllResults),
      exhaustMap(() => {
        return 
        return http.getGlobalData().pipe(
          map((results) => PageActions.loadGlobalsSuccess({ results })),
          catchError((error) => of(PageActions.loadGlobalsFailure({ error })))
        );
      })
    );
  },
  { functional: true }
);
 */