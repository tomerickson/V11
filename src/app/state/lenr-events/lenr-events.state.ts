import { createFeature, createReducer, on } from '@ngrx/store';
import { LenrEventDetail } from 'src/app/core/models/lenr-event-detail.model';
import { LenrEventActions } from './lenr-events.actions';

export interface LenrEventsState {
  formData: FormData;
  loading: boolean;
  ready: boolean;
  error: any;
  lenrEvents: LenrEventDetail[];
}

export const initialState: LenrEventsState = {
  formData: {} as FormData,
  loading: false,
  ready: false,
  error: null,
  lenrEvents: []
};

export const lenrEventReducer = createReducer(
  initialState,
  on(LenrEventActions.reset, () => {
    return {
      ...initialState
    };
  }),
  on(LenrEventActions.fetchAllResults, (state, action) => {
    return {
      ...state,
      formData: action.payload,
      loading: true,
      ready: false,
      error: null,
      lenrEvents: []
    };
  }),
  on(LenrEventActions.loadAllResultsFailure, (state, action) => {
    return { ...state, loading: false, error: action.error, ready: false };
  }),
  on(LenrEventActions.loadAllResultsSuccess, (state, action) => {
    return {
      ...state,
      lenrEvents: action.payload,
      loading: false,
      ready: true
    };
  })
);

export const lenrEventsFeature = createFeature({
  name: 'lenrevents',
  reducer: lenrEventReducer
});

export const {
  selectFormData,
  selectLoading,
  selectReady,
  selectError,
  selectLenrEvents
} = lenrEventsFeature;
