import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { actions } from './actions';
import { NotificationComponent } from 'src/app/core/notification.component';
import { AllResultsService } from 'src/app/all-results/all-results.service';
import { AllResultsResponseModel } from 'src/app/core/models/all-results-response.model';

/* export const requestPageEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const service = inject(AllResultsService);
    return actions$.pipe(
      ofType(actions.requestPage),
      switchMap(() =>
        service.getAllResultsPage().pipe(
          map((html: string) => service.extractAllResultsQuery(html)),
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
); */

export const loadAllResultsEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const service = inject(AllResultsService);
    return actions$.pipe(
      ofType(actions.loadResults),
      switchMap((action) =>
        service.getAllResultsResults(action.query).pipe(
          map((html: string) => service.extractAllResultsResults(html)),
          map((dto: AllResultsResponseModel) => actions.loadResultsSuccess({ payload: dto})),
          catchError((error) =>
            of(actions.loadResultsFailure({ error: error }))
          )
        )
      )
    );
  },
  { functional: true }
);

/* export const requesthAllResultsErrorAlert = createEffect(
  () => {
    const notifier = inject(NotificationComponent);
    return inject(Actions).pipe(
      ofType(actions.requestPageFailure),
      tap(() => notifier.showClientError('No results found.'))
    );
  },
  { functional: true, dispatch: false }
); */

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
