import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { actions } from './actions';
import { NotificationComponent } from 'src/app/core/notification.component';
import { AllResultsService } from 'src/app/all-results/all-results.service';
import { AllResultsResponseModel } from 'src/app/core/models/all-results-response.model';

/**
 * Load the first page after a refresh
 */
export const loadSuccessEfect = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(actions.loadResultsSuccess),
      switchMap(() => of(actions.loadPage({ pageSize: 10, pageNumber: 1 })))
    );
  },
  { functional: true }
);

/**
 * Call out to the server for the all-results page
 * and parse out the returned page to capture the
 * list of queries
 */
export const loadResultsEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const service = inject(AllResultsService);
    return actions$.pipe(
      ofType(actions.loadResults),
      switchMap((action) =>
        service.getAllResultsPage(action.query).pipe(
          map((html: string) => service.extractResultsTable(html)),
          map((dto: AllResultsResponseModel) =>
            actions.loadResultsSuccess({ payload: dto })
          ),
          catchError((error) =>
            of(actions.loadResultsFailure({ error: error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const refreshAllResultsEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const service = inject(AllResultsService);
    return actions$.pipe(
      ofType(actions.refreshResults),
      switchMap((action) =>
        service.refreshResults(action.sort).pipe(
          map((html: string) => service.extractResultsTable(html)),
          map((dto: AllResultsResponseModel) =>
            actions.loadResultsSuccess({ payload: dto })
          ),
          catchError((error) =>
            of(actions.loadResultsFailure({ error: error }))
          )
        )
      )
    );
  },
  { functional: true }
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
