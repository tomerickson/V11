import { createFeature, createReducer, on } from '@ngrx/store';
import { ICascadesAllForm } from 'src/app/core/models/cascades-all-form.model';
import { actions } from './actions';

export interface CascadesAllState {
  formData: ICascadesAllForm | null;
  loading: boolean;
  ready: boolean;
  error: any;
  link: string | null;
  reactionResults: any[];
  nuclideResults: any[];
  elementResults: any[];
  reactionRows: number;
  nuclideRows: number;
  elementRows: number;
}

export const cascadesAllInitialState: CascadesAllState = {
  formData: null,
  loading: false,
  ready: false,
  error: null,
  link: null,
  reactionResults: [],
  nuclideResults: [],
  elementResults: [],
  reactionRows: 0,
  nuclideRows: 0,
  elementRows: 0
};

export const cascadesAllReducer = createReducer(
  cascadesAllInitialState,
  on(actions.reset, () => {
    return {
      ...cascadesAllInitialState
    };
  }),
  on(actions.requestAllResults, (state, action) => {
    return {
      ...state,
      formData: action.payload,
      loading: true,
      ready: false,
      error: null
    };
  }),
  on(actions.requestAllResultsSuccess, (state, action) => {
    return { ...state, loading: false, ready: true, formData: action.payload };
  }),
  on(actions.requestAllResultsFailure, (state, error) => {
    return { ...state, loading: false, ready: false, error: error };
  }),
  on(actions.loadAllResults, (state, action) => {
    return {
      ...state,
      loading: true,
      ready: false,
      error: null,
      link: action.url,
      reactionRows: 0,
      nuclideRows: 0,
      elementRows: 0
    };
  }),
  on(actions.loadAllResultsSuccess, (state, action) => {
    return {
      ...state,
      ready: true,
      loading: false,
      reactionResults: action.payload.reactionResults,
      nuclideResults: action.payload.nuclideResults,
      elementResults: action.payload.elementResults,
      reactionRows: action.payload.reactionRows,
      nuclideRows: action.payload.nuclideRows,
      elementRows: action.payload.elementRows
    };
  }),
  on(actions.loadAllResultsFailure, (state, action) => {
    return { ...state, loading: false, error: action.error };
  })
);
export const feature = createFeature({
  name: 'cascades-all',
  reducer: cascadesAllReducer
});

export const {
  selectFormData,
  selectLoading,
  selectReady,
  selectError,
  selectLink,
  selectReactionResults,
  selectNuclideResults,
  selectElementResults,
  selectReactionRows,
  selectNuclideRows,
  selectElementRows
} = feature;
