import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { actions } from './actions';
import { NotificationComponent } from 'src/app/core/notification.component';
import { AllTablesService } from 'src/app/all-tables/all-tables.service';
import { AllTablesResultsModel } from 'src/app/core/models/all-tables-results.model';

export const requestPageEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const service = inject(AllTablesService);
    return actions$.pipe(
      ofType(actions.requestPage),
      switchMap(() =>
        service.getAllTablesPage().pipe(
          map((html: string) => service.extractAllTablesQuery(html)),
          map((query: string) =>
            actions.requestPageSuccess({ payload: query })
          ),
          catchError((error) =>
            of(actions.requestPageFailure({ error: error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const loadAllResultsEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const service = inject(AllTablesService);
    return actions$.pipe(
      ofType(actions.loadResults),
      switchMap((action) =>
        service.getAllTablesResults(action.query).pipe(
          map((html: string) => service.extractAllTablesResults(html)),
          map((dto: AllTablesResultsModel) => actions.loadResultsSuccess({ payload: dto})),
          catchError((error) =>
            of(actions.loadResultsFailure({ error: error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const requesthAllResultsErrorAlert = createEffect(
  () => {
    const notifier = inject(NotificationComponent);
    return inject(Actions).pipe(
      ofType(actions.requestPageFailure),
      tap(() => notifier.showClientError('No results found.'))
    );
  },
  { functional: true, dispatch: false }
);

export const fetchAllResultsErrorAlert = createEffect(
  () => {
    const notifier = inject(NotificationComponent);
    return inject(Actions).pipe(
      ofType(actions.loadResultsFailure),
      tap(() => notifier.showClientError('No results found.'))
    );
  },
  { functional: true, dispatch: false }
);
