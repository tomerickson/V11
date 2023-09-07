import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { actions } from './actions';
import { IAllResultsDataModel } from 'src/app/core/models/all-results-data.model';

export interface AllResultsState {
  query: string;
  loading: boolean;
  ready: boolean;
  error: any;
  results: IAllResultsDataModel[];
}

export const allResultsInitialState: AllResultsState = {
  query: '',
  loading: false,
  ready: false,
  error: null,
  results: []
};

export const allResultsReducer = createReducer(
  allResultsInitialState,
  on(actions.reset, () => {
    return {
      ...allResultsInitialState
    };
  }),
  on(actions.loadResults, (state, action) => {
    return {
      ...state,
      query: action.query,
      loading: true,
      ready: false,
      error: null,
     results: []
    };
  }),
  on(actions.loadResultsSuccess, (state, action) => {
    return {
      ...state,
      ready: true,
      loading: false,
      results: action.payload.reactionResults
    };
  }),
  on(actions.loadResultsFailure, (state, action) => {
    return { ...state, loading: false, error: action.error };
  })
);

export const feature = createFeature({
  name: 'all-results',
  reducer: allResultsReducer,
  extraSelectors: ({selectResults}) => ({
    selectRows: createSelector(selectResults, (r) => r.length)
  })
});

export const {
    selectLoading,
    selectReady,
    selectError,
    selectQuery,
    selectResults,
    selectRows
} = feature
