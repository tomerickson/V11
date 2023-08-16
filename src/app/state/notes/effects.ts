import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { NotificationComponent } from 'src/app/core/notification.component';
import { NotesService } from 'src/app/notes/notes.service';
import { actions } from './actions';

export const fetchPageEFfect = createEffect(
  (actions$ = inject(Actions)) => {

    const service= inject(NotesService)
    return actions$.pipe(
      ofType(actions.fetchPage),
      switchMap(() =>
        service.getNotesPage().pipe(
          map((html) => service.parseNotesPage(html)),
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
