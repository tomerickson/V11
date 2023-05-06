import { createFeature, createReducer, on } from '@ngrx/store';
import { IElementResultsModel } from 'src/app/core/models/element.results.model';
import { IFusionResultsModel } from 'src/app/core/models/fusion.results.model';
import { INuclideResultsModel } from 'src/app/core/models/nuclide.results.model';
import { FusionActions } from './fusion.actions';

export interface FusionState {
  elementResults: IElementResultsModel[];
  fusionResults: IFusionResultsModel[];
  nuclideResults: INuclideResultsModel[];
  elementResultsLoading: boolean;
  elementResultsReady: boolean;
  fusionResultsLoading: boolean;
  fusionResultsReady: boolean;
  nuclidesLoading: boolean;
  nuclidesReady: boolean;
  error: any;
}

export const fusionInitialState: FusionState = {
  elementResults: [],
  fusionResults: [],
  nuclideResults: [],
  elementResultsReady: false,
  elementResultsLoading: false,
  fusionResultsLoading: false,
  fusionResultsReady: false,
  nuclidesLoading: false,
  nuclidesReady: false,
  error: null
};

export const fusionFeature = createFeature({
  name: 'fusion',
  reducer: createReducer(
    fusionInitialState,
    on(FusionActions.loadElementresults, (state) => {
      return {
        ...state,
        elementResultsReady: false,
        elementResultsLoading: true,
        elementResults: [],
      };
    }),
    on(FusionActions.loadElementresultsFailure, (state, action) => {
      return {
        ...state,
        elementResultsReady: false,
        elementResultsLoading: false,
        elements: [],
        error: action.error
      };
    }),
    on(FusionActions.loadElementresultsSuccess, (state, action) => {
      return {
        ...state,
        elementResultsReady: true,
        elementResultsLoading: false,
        elements: action.elements
      };
    }),
        on(FusionActions.loadElementresults, (state) => {
        return {
          ...state,
          elementResultsReady: false,
          elementResultsLoading: true,
          elementResults: [],
        };
      }),
      on(FusionActions.loadElementresultsFailure, (state, action) => {
        return {
          ...state,
          elementResultsReady: false,
          elementResultsLoading: false,
          elements: [],
          error: action.error
        };
      }),
      on(FusionActions.loadElementresultsSuccess, (state, action) => {
        return {
          ...state,
          elementResultsReady: true,
          elementResultsLoading: false,
          elements: action.elements
        };
      }),


  )
});

export const {

} = fusionFeature;

/**
 * Effects
 */
/* export const fetchElements$ = createEffect(
  (actions$ = inject(Actions)) => {
    const http = inject(CrudService);
    return actions$.pipe(
      ofType(PageActions.enter),
      exhaustMap(() => {
        return http.getGlobalData().pipe(
          map((results) => PageActions.loadGlobalsSuccess({ results })),
          catchError((error) => of(PageActions.loadGlobalsFailure({ error })))
        );
      })
    );
  },
  { functional: true }
); */
