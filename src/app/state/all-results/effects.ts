import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';import { concatLatestFrom } from '@ngrx/operators';

import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AllResultsService } from 'src/app/all-results/all-results.service';
import { AllResultsResponseModel } from 'src/app/core/models/all-results-response.model';
import { NotificationComponent } from 'src/app/core/notification.component';
import { PageNavigator } from 'src/app/shared/models/page-navigator';
import { actions, feature } from '.';
import { AllResultsState } from './state';

/**
 * Load the first page after a refresh
 */
export const getFirstPageEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const store = inject(Store<AllResultsState>);
    return actions$.pipe(
      ofType(actions.loadResultsSuccess),
      concatLatestFrom(() => store.select(feature.selectNavigator)),
      map(([, navigator]) => {
        const newNav: PageNavigator = {page: 1, size: 10, sizes: navigator.sizes};
        newNav.page = 1;
        newNav.size = 10;
        return actions.setPage({ payload: newNav });
      })
    );
  },
  { functional: true }
);

/**
 * Refresh the current page after a sort
 */
export const getCurrentPageEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const store = inject(Store<AllResultsState>);
    return actions$.pipe(
      ofType(actions.sort),
      concatLatestFrom(() => store.select(feature.selectNavigator)),
      map(([, navigator]) => actions.setPage({ payload: navigator }))
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
