import { createFeature, createReducer, on } from '@ngrx/store';
import { actions } from './two-up.actions';
import { KeyValuePair } from 'src/app/core/models/key-value-pair.model';

export interface TwoUpState {
  formData: KeyValuePair[];
  loading: boolean;
  ready: boolean;
  error: any;
  elementResults: any[];
  reactionResults: any[];
  nuclideResults: any[];
  reactionRows: number;
  nuclideRows: number;
  elementRows: number;
}

export const twoupInitialState: TwoUpState = {
  formData: [],
  loading: false,
  ready: false,
  error: null,
  reactionResults: [],
  nuclideResults: [],
  elementResults: [],
  reactionRows: 0,
  nuclideRows: 0,
  elementRows: 0
};

export const twoupReducer = createReducer(
  twoupInitialState,
  on(actions.reset, () => {
    return {
      ...twoupInitialState
    };
  }),
  on(actions.fetchAllResults, (state, action) => {
    return {
      ...state,
      formData: action.payload,
      loading: true,
      ready: false,
      error: null,
      reactionResults: [],
      nuclideResults: [],
      elementResults: []
    };
  }),
  on(actions.loadAllResultsFailure, (state, action) => {
    return { ...state, loading: false, error: action.error, ready: false };
  }),
  on(actions.loadAllResultsSuccess, (state, action) => {
    return {
      ...state,
      elementResults: action.results.elementResults,
      reactionResults: action.results.reactionResults,
      nuclideResults: action.results.nuclideResults,
      reactionRows: action.results.reactionResults.length-1,
      nuclideRows: action.results.nuclideResults.length-1,
      elementRows: action.results.elementResults.length-1,
      loading: false,
      ready: true
    };
  })
);

export const feature = createFeature({
  name: 'twoup',
  reducer: twoupReducer
});

export const {
  selectFormData,
  selectLoading,
  selectReady,
  selectElementResults,
  selectError,
  selectReactionResults,
  selectNuclideResults,
  selectReactionRows,
  selectNuclideRows,
  selectElementRows,
} = feature;
