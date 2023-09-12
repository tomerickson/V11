import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { actions } from './actions';
import { IAllResultsDataModel } from 'src/app/core/models/all-results-data.model';

export interface AllResultsState {
  query: string;
  loading: boolean;
  ready: boolean;
  error: any;
  results: IAllResultsDataModel[];
  pageNumber: number;
  pageSize: number;
}

export const allResultsInitialState: AllResultsState = {
  query: '',
  loading: false,
  ready: false,
  error: null,
  results: [],
  pageNumber: 1,
  pageSize: 1
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
  }),
  on(actions.loadPage, (state, action) => {
    return {...state, pageNumber: action.pageNumber, pageSize: action.pageSize}
  })
);

export const feature = createFeature({
  name: 'all-results',
  reducer: allResultsReducer,
  extraSelectors: ({selectResults, selectPageNumber, selectPageSize}) => ({
    selectRows: createSelector(selectResults, (r) => r.length),
    selectPage: createSelector(selectResults, selectPageNumber, selectPageSize, (r, p, s) => {
      const pageBegin = (p-1) * s;
      const pageEnd = Math.min(pageBegin + s - 1, r.length-1);
      return r.slice(pageBegin, pageEnd);
    })
  })
});

export const {
    selectLoading,
    selectReady,
    selectError,
    selectQuery,
    selectResults,
    selectRows,
    selectPage
} = feature
