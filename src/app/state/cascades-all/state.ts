import { createFeature, createReducer, on } from '@ngrx/store';
import { ICascadesAllForm } from 'src/app/core/models/cascades-all-form.model';
import { CascadesAllActions } from './actions';

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
  on(CascadesAllActions.reset, () => {
    return {
      ...cascadesAllInitialState
    };
  }),
  on(CascadesAllActions.requestAllResults, (state, action) => {
    return {
      ...state,
      formData: action.payload,
      loading: true,
      ready: false,
      error: null,
      link: null,
      reactionRows: 0,
      nuclideRows: 0,
      elementRows: 0
    };
  }),
  on(CascadesAllActions.requestAllResultsSuccess, (state, action) => {
    return { ...state, loading: false, ready: true, formData: action.payload };
  }),
  on(CascadesAllActions.requestAllResultsFailure, (state, error) => {
    return { ...state, loading: false, ready: false, error: error };
  }),
  on(CascadesAllActions.loadAllResultsSuccess, (state, action) => {
    return {
      ...state,
      ready: true,
      loading: false,
      reactionResults: action.results[0],
      nuclideResults: action.results[1],
      elementResults: action.results[2],
      reactionRows: action.results[0].length,
      nuclideRows: action.results[1].length,
      elementRows: action.results[2].length
    };
  })
);
export const cascadesAllFeature = createFeature({
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
selectElementRows,
} = cascadesAllFeature;