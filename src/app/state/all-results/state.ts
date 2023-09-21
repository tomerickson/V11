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
    let result: number;
    let oType = typeof +a[property];
    // console.log(`a[property]: ${a[property]}, property: ${String(property)}, type: ${oType}`)
    if (oType === 'number') {
      result = genericSort(+a[property], +b[property]);
    } else {
      result = genericSort(a[property], b[property]);
    }
    if (direction === 'desc') {
      result = 0 - result;
    }
    return result;
  };
}

const genericSort = (a: any, b: any): number => {
  return a < b ? -1 : a > b ? 1 : 0;
};

export interface AllResultsState {
  query: string;
  loading: boolean;
  ready: boolean;
  error: any;
  results: IAllResultsDataModel[];
  page: IAllResultsDataModel[];
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
  page: [],
  navigator: {
    page: 1,
    size: 10,
    sizes: [5, 10, 15, 20]
  } as PageNavigator,
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
    const length = state.results.length;
    const bgn = (action.payload.page - 1) * action.payload.size;
    const end = Math.min(bgn + action.payload.size, length);
    return {
      ...state,
      pageNumber: action.payload.page,
      pageSize: action.payload.size,
      page: state.results.slice(bgn, end)
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
  extraSelectors: ({ selectResults }) => ({
    selectRows: createSelector(selectResults, (results) => results.length)
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
