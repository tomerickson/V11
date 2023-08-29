import { createFeature, createReducer, on } from '@ngrx/store';
import { actions } from './actions';

export interface AllResultsState {
  query: string;
  loading: boolean;
  ready: boolean;
  error: any;
  results: any[];
  rows: number;
}

export const allResultsInitialState: AllResultsState = {
  query: '',
  loading: false,
  ready: false,
  error: null,
  results: [],
  rows: 0
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
     results: [],
     rows: 0
    };
  }),
  on(actions.loadResultsSuccess, (state, action) => {
    return {
      ...state,
      ready: true,
      loading: false,
      results: action.payload.reactionResults,
      rows: action.payload.reactionRows
    };
  }),
  on(actions.loadResultsFailure, (state, action) => {
    return { ...state, loading: false, error: action.error };
  })
);
export const feature = createFeature({
  name: 'all-results',
  reducer: allResultsReducer
});

export const {
    selectLoading,
    selectReady,
    selectError,
    selectQuery,
    selectResults,
    selectRows
} = feature;
