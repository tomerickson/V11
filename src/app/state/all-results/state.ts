import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { actions } from './actions';
import { IAllResultsDataModel } from 'src/app/core/models/all-results-data.model';
import { PageNavigator } from 'src/app/shared/models/page-navigator';
import { SortDirection } from '@angular/material/sort';

const getPageEnd = (
  length: number,
  pageBegin: number,
  pageSize: number
): number => {
  let result = Math.min(pageBegin + pageSize - 1, length - 1);
  console.log(`pageBegin: ${pageBegin}, pageEnd: ${result}`);
  return result;
};

function by<T extends keyof U, U>(
  property: T,
  direction: SortDirection
): (a: U, b: U) => number {
  return (a, b) => {
    let result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    if (direction === 'desc') {
      result = 0 - result;
    }
    return result;
  };
}

export interface AllResultsState {
  query: string;
  loading: boolean;
  ready: boolean;
  error: any;
  results: IAllResultsDataModel[];
  navigator: PageNavigator;
  pageNumber: number;
  pageSize: number;
}

export const allResultsInitialState: AllResultsState = {
  query: '',
  loading: false,
  ready: false,
  error: null,
  results: [],
  navigator: {currentPage: 1, pageSize: 10, pageSizes: [5, 10, 15, 20]} as PageNavigator,
  pageNumber: 1,
  pageSize: 10
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
  on(actions.setPage, (state, action) => {
    return {
      ...state,
      pageNumber: action.payload.currentPage,
      pageSize: action.payload.pageSize
    };
  }),
  on(actions.sort, (state, action) => {
    const sortBy: keyof IAllResultsDataModel = action.payload
      .active as keyof IAllResultsDataModel;
    return {
      ...state,
      results: [...state.results].sort(by(sortBy, action.payload.direction))
    };
  })
);

export const feature = createFeature({
  name: 'all-results',
  reducer: allResultsReducer,
  extraSelectors: ({ selectResults, selectPageNumber, selectPageSize }) => ({
    selectRows: createSelector(selectResults, (results) => results.length),
    selectPage: createSelector(
      selectResults,
      selectPageNumber,
      selectPageSize,
      (r, p, s) => {
        const pageBegin = (p - 1) * s;
        const pageEnd = getPageEnd(r.length, pageBegin, s);
        return r.slice(pageBegin, pageEnd);
      }
    )
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
} = feature;
