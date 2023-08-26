import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { NotificationComponent } from 'src/app/core/notification.component';
import { actions } from './actions';
import { TablesInDetailService } from 'src/app/tables-in-detail/tables-in-detail.service';

export const fetchPageEFfect = createEffect(
  (actions$ = inject(Actions)) => {

    const service= inject(TablesInDetailService)
    return actions$.pipe(
      ofType(actions.fetchPage),
      switchMap(() =>
        service.getTablesPage().pipe(
          map((html) => service.parseTablesPage(html)),
          map((children) =>
            actions.fetchPageSuccess({ payload: children })
          ),
          catchError((error) =>
            of(actions.fetchPageFailure({ error: error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const fetchPageErrorAlert = createEffect(
  () => {
    const notifier = inject(NotificationComponent);
    return inject(Actions).pipe(
      ofType(actions.fetchPageFailure),
      tap(() => notifier.showClientError('No results found.'))
    );
  },
  { functional: true, dispatch: false }
);
