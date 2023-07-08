import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { NotificationComponent } from 'src/app/core/notification.component';
import { LenrEventActions } from './lenr-events.actions';
import { EventServices } from '../../lenr-events/lenr-events.service';

export type LenrPrefetchProperties = {
  categories: string[];
  eventCount: number;
  maxId: number;
}
export const prefetchEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const svc = inject(EventServices);
    return actions$.pipe(
      ofType(LenrEventActions.prefetch),
      switchMap((action) =>
        svc.preFetchProperty(action.payload).pipe(
          map((html) => {
            const props: LenrPrefetchProperties = svc.parseProperties(html);
             return LenrEventActions.prefetchSuccess({ payload: props });
          }),
          catchError((error) =>
            of(LenrEventActions.prefetchFailure({ error: error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const fetchAllResultsEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const svc = inject(EventServices);
    return actions$.pipe(
      ofType(LenrEventActions.fetchAllResults),
      switchMap((action) =>
        svc.fetchEventDetails(action.payload).pipe(
          map((results) =>
            LenrEventActions.loadAllResultsSuccess({ payload: results })
          ),
          catchError((error) =>
            of(LenrEventActions.loadAllResultsFailure({ error: error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const loadAllEventsErrorAlert = createEffect(
  () => {
    const notifier = inject(NotificationComponent);
    return inject(Actions).pipe(
      ofType(LenrEventActions.loadAllResultsFailure),
      tap(() => notifier.showClientError('No results found.'))
    );
  },
  { functional: true, dispatch: false }
);

export const prefetchErrorAlert = createEffect(
  () => {
    const notifier = inject(NotificationComponent);
    return inject(Actions).pipe(
      ofType(LenrEventActions.prefetchFailure),
      tap(() => notifier.showClientError('Something went wrong'))
    )
  },
  {functional: true, dispatch: false}
);
