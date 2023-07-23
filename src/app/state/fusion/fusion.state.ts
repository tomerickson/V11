import { createFeature, createReducer, on } from '@ngrx/store';
import { IKeyValuePair } from 'src/app/core/models/key-value-pair.model';
import { FusionActions } from './fusion.actions';

export interface FusionState {
  formData: IKeyValuePair[];
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

export const fusionInitialState: FusionState = {
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

export const fusionReducer = createReducer(
  fusionInitialState,
  on(FusionActions.reset, () => {
    return {
      ...fusionInitialState
    };
  }),
  on(FusionActions.fetchAllResults, (state, action) => {
    return {
      ...state,
      formData: action.payload,
      loading: true,
      ready: false,
      error: null,
      reactionResults: [],
      nuclideResults: [],
      elementResults: [],
      reactionRows: 0,
      nuclideRows: 0,
      elementRows: 0
    };
  }),
  on(FusionActions.loadAllResultsFailure, (state, action) => {
    return { ...state, loading: false, error: action.error, ready: false };
  }),
  on(FusionActions.loadAllResultsSuccess, (state, action) => {
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

export const fusionFeature = createFeature({
  name: 'fusion',
  reducer: fusionReducer
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
} = fusionFeature;
