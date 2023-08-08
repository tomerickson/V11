import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CascadesService } from 'src/app/cascades/cascades.service';
import { CascadesAllActions } from './actions';
import { NotificationComponent } from 'src/app/core/notification.component';
import { ICascadesAllForm } from 'src/app/core/models/cascades-all-form.model';
import { CascadesAllResultsModel } from 'src/app/core/models/cascades-all-results.model';

export const requestAllResultsEffect = createEffect(
  (actions$ = inject(Actions)) => {
    const service = inject(CascadesService);
    return actions$.pipe(
      ofType(CascadesAllActions.requestAllResults),
      switchMap((action) =>
        service.getCascadesAllResponse(action.payload).pipe(
          map((html) => service.parseCascadesAllResponse(html)),
          tap((dto) => console.log('dto', dto)),
          map((dto: ICascadesAllForm) =>
            CascadesAllActions.requestAllResultsSuccess({ payload: dto })
          ),
          catchError((error) =>
            of(CascadesAllActions.requestAllResultsFailure({ error: error }))
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
      ofType(CascadesAllActions.loadAllResults),
      switchMap((action) =>
        service.loadCascadesAllResponse(action.url).pipe(
          map((html) => service.parseCascadesAllTables(html)),
          map((dto: CascadesAllResultsModel) => {
            if (dto.ok)
              return CascadesAllActions.loadAllResultsSuccess({ payload: dto });
            else
              return CascadesAllActions.loadAllResultsFailure({
                error: dto.errors
              });
          }),
          catchError((error) =>
            of(CascadesAllActions.loadAllResultsFailure({ error: error }))
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
      ofType(CascadesAllActions.requestAllResultsFailure),
      tap(() => notifier.showClientError('No results found.'))
    );
  },
  { functional: true, dispatch: false }
);

export const fetchAllResultsErrorAlert = createEffect(
  () => {
    const notifier = inject(NotificationComponent);
    return inject(Actions).pipe(
      ofType(CascadesAllActions.fetchAllResultsFailure),
      tap(() => notifier.showClientError('No results found.'))
    );
  },
  { functional: true, dispatch: false }
);
