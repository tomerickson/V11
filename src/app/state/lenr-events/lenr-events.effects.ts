import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { NotificationComponent } from 'src/app/core/notification.component';
import { LenrEventActions } from './lenr-events.actions';
import { EventServices } from '../../lenr-events/lenr-events.service';
import { ILenrEventsLookup } from 'src/app/core/models/lenr-events-lookup.model';
import { LenrEventsPrefetchModel } from '../../core/models/lenr-events-prefetch.model.';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ILenrEventDetail } from 'src/app/core/models/lenr-event-detail.model';

export const prefetchEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const svc = inject(EventServices);
    return actions$.pipe(
      ofType(LenrEventActions.prefetch),
      switchMap((action) =>
        svc.preFetchProperty(action.payload).pipe(
          map((html) => {
            const props: LenrEventsPrefetchModel = svc.parseProperties(html);
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

export const fetchSearchResultsEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const svc = inject(EventServices);
    return actions$.pipe(
      ofType(LenrEventActions.fetchSearchResults),
      switchMap((action) =>
        svc.postEventPage(action.payload).pipe(
          map((html) => {
            const events: ILenrEventsLookup[] = svc.parseEventList(html);
            return LenrEventActions.fetchSearchResultsSuccess({
              payload: events
            });
          }),
          catchError((error) =>
            of(LenrEventActions.fetchSearchResultsFailure({ error: error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const loadEventDetailEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const svc = inject(EventServices);
    return actions$.pipe(
      ofType(LenrEventActions.loadEventDetail),
      switchMap((action) =>
        svc.postEventPage(action.payload).pipe(
          map((html) => {
            const detail: ILenrEventDetail = svc.parseEventDetail(html, action.payload.r_id);
            return LenrEventActions.loadEventDetailSuccess({ payload: detail });
          }),
          catchError((error) =>
            of(LenrEventActions.loadEventDetailFailure({ error: error }))
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
      ofType(LenrEventActions.fetchSearchResultsFailure),
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
    );
  },
  { functional: true, dispatch: false }
);
