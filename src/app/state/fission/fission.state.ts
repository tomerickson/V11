import { createFeature, createReducer, on } from '@ngrx/store';
import { IKeyValuePair } from 'src/app/core/models/key-value-pair.model';
import { FissionActions } from './fission.actions';
import { IFissionResultsModel } from 'src/app/core/models/fission-results.model';

export interface FissionState {
  formData: IKeyValuePair[];
  loading: boolean;
  ready: boolean;
  error: any;
  elementResults: any[];
  reactionResults: IFissionResultsModel[];
  nuclideResults: any[];
  reactionRows: number;
  nuclideRows: number;
  elementRows: number;
}

export const fissionInitialState: FissionState = {
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

export const fissionReducer = createReducer(
  fissionInitialState,
  on(FissionActions.reset, () => {
    return {
      ...fissionInitialState
    };
  }),
  on(FissionActions.fetchAllResults, (state, action) => {
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
  on(FissionActions.loadAllResultsFailure, (state, action) => {
    return { ...state, loading: false, error: action.error, ready: false };
  }),
  on(FissionActions.loadAllResultsSuccess, (state, action) => {
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

export const fissionFeature = createFeature({
  name: 'fission',
  reducer: fissionReducer
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
} = fissionFeature;
