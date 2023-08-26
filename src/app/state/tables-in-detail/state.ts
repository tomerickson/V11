import { createFeature, createReducer, on } from '@ngrx/store';
import { actions } from './actions';

export interface State {
  html: string;
  ready: boolean;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  html: '',
  ready: false,
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(actions.reset, () => {
    return { ...initialState };
  }),
  on(actions.fetchPage, (state) => {
    return { ...state, ready: false, loading: true, error: null };
  }),
  on(actions.fetchPageSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      ready: true,
      html: action.payload
    };
  }),
  on(actions.fetchPageFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    };
  })
);

export const feature = createFeature({
  name: 'tables-in-detail',
  reducer: reducer
});

export const {
  selectHtml,
  selectReady,
  selectLoading,
  selectError,
} = feature;
