import { createFeature, createReducer, on } from '@ngrx/store';
import { actions } from './actions';

export interface AllTablesState {
  query: string;
  loading: boolean;
  ready: boolean;
  error: any;
  results: any[];
  rows: number;
}

export const allTablesInitialState: AllTablesState = {
  query: '',
  loading: false,
  ready: false,
  error: null,
  results: [],
  rows: 0
};

export const allTablesReducer = createReducer(
  allTablesInitialState,
  on(actions.reset, () => {
    return {
      ...allTablesInitialState
    };
  }),
  on(actions.requestPage, (state) => {
    return {
      ...state,
     query: '',
      loading: true,
      ready: false,
      error: null
    };
  }),
  on(actions.requestPageSuccess, (state, action) => {
    return { ...state, loading: false, ready: true, query: action.payload };
  }),
  on(actions.requestPageFailure, (state, error) => {
    return { ...state, loading: false, ready: false, error: error };
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
  name: 'all-tables',
  reducer: allTablesReducer
});

export const {
    selectLoading,
    selectReady,
    selectError,
    selectQuery,
    selectResults,
    selectRows
} = feature;
