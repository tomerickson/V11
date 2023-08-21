import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ElementDataResultsModel } from 'src/app/core/models/element-data-results.model';
import { NotificationComponent } from 'src/app/core/notification.component';
import { ElementDataService } from 'src/app/element-data/element-data.service';
import { actions } from './actions';

export const loadAllResultsEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const service = inject(ElementDataService);
    return actions$.pipe(
      ofType(actions.loadAllResults),
      switchMap((action) =>
        service.getElementDataPage(action.payload).pipe(
          map((html) => service.extractElementDataResults(html)),
          map((dto: ElementDataResultsModel) => {
            if (dto.ok)
              return actions.loadAllResultsSuccess({ payload: dto });
            else
              return actions.loadAllResultsFailure({
                error: dto.errors
              });
          }),
          catchError((error) =>
            of(actions.loadAllResultsFailure({ error: error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const loadAllResultsErrorAlert = createEffect(
  () => {
    const notifier = inject(NotificationComponent);
    return inject(Actions).pipe(
      ofType(actions.loadAllResultsFailure),
      tap(() => notifier.showClientError('No results found.'))
    );
  },
  { functional: true, dispatch: false }
);

export const fetchAllResultsErrorAlert = createEffect(
  () => {
    const notifier = inject(NotificationComponent);
    return inject(Actions).pipe(
      ofType(actions.loadAllResultsFailure),
      tap(() => notifier.showClientError('No results found.'))
    );
  },
  { functional: true, dispatch: false }
);
