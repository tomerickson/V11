import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { NotificationComponent } from 'src/app/core/notification.component';
import { CrudService } from 'src/app/core/services/crud.service';
import * as eventService from '../../core/services/event.services';
import { LenrEventActions } from './lenr-events.actions';

export const fetchAllResultsEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const crud = inject(CrudService);
    return actions$.pipe(
      ofType(LenrEventActions.fetchAllResults),
      switchMap((action) =>
        crud.getLenrEvents(action.payload).pipe(
          map((html) => eventService.parseEventPage(html)),
          map((tables) =>
            LenrEventActions.loadAllResultsSuccess({ payload: tables })
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
