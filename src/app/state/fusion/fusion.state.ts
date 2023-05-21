import { createFeature, createReducer, on } from '@ngrx/store';
import { IKeyValuePair } from 'src/app/core/models/key-value-pair.model';
import { FusionActions } from './fusion.actions';

export interface FusionState {
  formData: IKeyValuePair[];
  loading: boolean;
  ready: boolean;
  error: any;
  elementResults: any[];
  fusionResults: any[];
  nuclideResults: any[];
}

export const fusionInitialState: FusionState = {
  formData: [],
  loading: false,
  ready: false,
  error: null,
  fusionResults: [],
  nuclideResults: [],
  elementResults: []
};

export const fusionReducer = createReducer(
  fusionInitialState,
  on(FusionActions.reset, () => {
    return {
      ...fusionInitialState     
    }
  }),
  on(FusionActions.fetchAllResults, (state, action) => {
    return {
      ...state,
      formData: action.payload,
      loading: true,
      ready: false,
      error: null,
      fusionResults: [],
      nuclideResults: [],
      elementResults: []
    };
  }),
  on(FusionActions.loadAllResultsFailure, (state, action) => {
    return { ...state, loading: false, error: action.error };
  }),
  on(FusionActions.loadAllResultsSuccess, (state, action) => {
    return {
      ...state,
      elementResults: action.results.elementResults,
      fusionResults: action.results.fusionResults,
      nuclideResults: action.results.nuclideResults,
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
  selectFusionResults,
  selectNuclideResults
} = fusionFeature;
