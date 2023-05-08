import { createFeature, createReducer, on } from '@ngrx/store';
import { IElementResultsModel } from 'src/app/core/models/element.results.model';
import { IFusionResultsModel } from 'src/app/core/models/fusion.results.model';
import { INuclideResultsModel } from 'src/app/core/models/nuclide.results.model';
import { FusionActions } from './fusion.actions';

export interface FusionState {
  loading: boolean;
  ready: boolean;
  error: any;
  elementResults: IElementResultsModel[];
  fusionResults: IFusionResultsModel[];
  nuclideResults: INuclideResultsModel[];
}

export const fusionInitialState: FusionState = {
  loading: false,
  ready: false,
  error: null,
  elementResults: [],
  fusionResults: [],
  nuclideResults: []
};

export const fusionFeature = createFeature({
  name: 'fusion',
  reducer: createReducer(
    fusionInitialState,
    on(FusionActions.fetchAllResults, (state) => {
      return {
        ...state,
        loading: true,
        ready: false,
        error: null,
        elementResults: [],
        fusionResults: [],
        nuclideResults: []
      };
    }),
    on(FusionActions.loadAllResultsFailure, (state, action) => {
      return { ...state, loading: false, error: action.error };
    }),
    on(FusionActions.loadAllResultsSuccess, (state, action) => {
      return {
        ...state,
        elementResults: action.elements,
        fusionResults: action.fusions,
        nuclideResults: action.nuclides
      };
    })
  )
});

export const {
  selectLoading,
  selectReady,
  selectElementResults,
  selectError,
  selectFusionResults,
  selectNuclideResults
} = fusionFeature

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
