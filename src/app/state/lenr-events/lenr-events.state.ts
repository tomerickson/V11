import { createFeature, createReducer, on } from '@ngrx/store';
import { LenrEventDetail } from 'src/app/core/models/lenr-event-detail.model';
import { LenrEventActions } from './lenr-events.actions';

export interface LenrEventsState {
  formData: FormData;
  loading: boolean;
  ready: boolean;
  error: any;
  eventCount: number;
  maxEventId: number;
  categories: string[];
  lenrEvents: LenrEventDetail[];
  html: any;
}

export const initialState: LenrEventsState = {
  formData: {} as FormData,
  loading: false,
  ready: false,
  error: null,
  eventCount: 0,
  maxEventId: 0,
  categories: [],
  lenrEvents: [],
  html: null
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
  on(LenrEventActions.prefetch, (state) => {
    return {
      ...state,
      eventCount: 0,
      maxEventId: 0,
      categories: [],
      error: null
    };
  }),
   on(LenrEventActions.prefetchSuccess, (state, action) => {
    return {
      ...state,
      eventCount: action.payload.eventCount,
      maxEventId: action.payload.maxId,
      categories: action.payload.categories
    };
  }),
  on(LenrEventActions.fetchAllResults, (state) => {
    return { ...state, loading: true, ready: false, error: null };
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
  selectEventCount,
  selectMaxEventId,
  selectCategories,
  selectLenrEvents
} = lenrEventsFeature;
