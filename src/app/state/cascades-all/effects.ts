import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CascadesService } from 'src/app/cascades/cascades.service';
import { actions } from './actions';
import { NotificationComponent } from 'src/app/core/notification.component';
import { ICascadesAllForm } from 'src/app/core/models/cascades-all-form.model';
import { CascadesAllResultsModel } from 'src/app/core/models/cascades-all-results.model';

export const requestAllResultsEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const service = inject(CascadesService);
    return actions$.pipe(
      ofType(actions.requestAllResults),
      switchMap((action) =>
        service.getCascadesAllResponse(action.payload).pipe(
          map((html) => service.parseCascadesAllResponse(html)),
          tap((html) => console.log('html', html)),
          tap((dto) => console.log('dto', dto)),
          map((dto: ICascadesAllForm) =>
            actions.requestAllResultsSuccess({ payload: dto })
          ),
          catchError((error) =>
            of(actions.requestAllResultsFailure({ error: error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const loadAllResultsEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const service = inject(CascadesService);
    return actions$.pipe(
      ofType(actions.loadAllResults),
      switchMap((action) =>
        service.loadCascadesAllResponse(action.url).pipe(
          map((html) => service.parseCascadesAllTables(html)),
          map((dto: CascadesAllResultsModel) => {
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

export const requesthAllResultsErrorAlert = createEffect(
  () => {
    const notifier = inject(NotificationComponent);
    return inject(Actions).pipe(
      ofType(actions.requestAllResultsFailure),
      tap(() => notifier.showClientError('No results found.'))
    );
  },
  { functional: true, dispatch: false }
);

export const fetchAllResultsErrorAlert = createEffect(
  () => {
    const notifier = inject(NotificationComponent);
    return inject(Actions).pipe(
      ofType(actions.fetchAllResultsFailure),
      tap(() => notifier.showClientError('No results found.'))
    );
  },
  { functional: true, dispatch: false }
);
