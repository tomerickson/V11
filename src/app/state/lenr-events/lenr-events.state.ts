import { createFeature, createReducer, on } from '@ngrx/store';
import { ILenrEventDetail } from 'src/app/core/models/lenr-event-detail.model';
import { LenrEventActions } from './lenr-events.actions';
import { ILenrEventsRequest } from 'src/app/core/models/lenr-events-request.model';
import { ILenrEventsLookup } from 'src/app/core/models/lenr-events-lookup.model';

export interface LenrEventsState {
  formData: ILenrEventsRequest;
  loading: boolean;
  ready: boolean;
  error: any;
  eventCount: number;
  maxEventId: number;
  currentEventId: number;
  currentEvent: ILenrEventDetail;
  categories: string[];
  lenrEvents: ILenrEventsLookup[];
  html: any;
}

export const initialState: LenrEventsState = {
  formData: {} as ILenrEventsRequest,
  loading: false,
  ready: false,
  error: null,
  eventCount: 0,
  maxEventId: 0,
  currentEventId: 0,
  currentEvent: {} as ILenrEventDetail,
  categories: [],
  lenrEvents: [],
  html: null
};

export const lenrEventsReducer = createReducer(
  initialState,
  on(LenrEventActions.reset, () => {
    return {
      ...initialState
    };
  }),
  on(LenrEventActions.prefetch, (state) => {
    return {
      ...state,
      eventCount: 0,
      maxEventId: 0,
      categories: [],
      lenrDetails: [],
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
  on(LenrEventActions.prefetchFailure, (state, action) => {
    return { ...state, loading: false, ready: false, error: action.error };
  }),

  on(LenrEventActions.fetchSearchResults, (state) => {
    return { ...state, loading: true, ready: false, error: null };
  }),
  on(LenrEventActions.fetchSearchResultsFailure, (state, action) => {
    return { ...state, loading: false, error: action.error, ready: false };
  }),
  on(LenrEventActions.fetchSearchResultsSuccess, (state, action) => {
    return {
      ...state,
      lenrEvents: action.payload,
      loading: false,
      ready: true
    };
  }),
  on(LenrEventActions.findEventId, (state, action) => {
    return {
      ...state,
      currentEventId: action.payload
    };
  }),
  on(LenrEventActions.loadEventDetail, (state, action) => {
    return {
      ...state,
      loading: true,
      ready: false,
      error: false,
      currentEventId: action.payload.r_id
    };
  }),
  on(LenrEventActions.loadEventDetailFailure, (state, action) => {
    return { ...state, loading: false, ready: false, error: action.error };
  }),
  on(LenrEventActions.loadEventDetailSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      ready: false,
      error: false,
      currentEvent: action.payload
    };
  })
);

export const lenrEventsFeature = createFeature({
  name: 'lenrevents',
  reducer: lenrEventsReducer
});

export const {
  selectFormData,
  selectLoading,
  selectReady,
  selectError,
  selectEventCount,
  selectMaxEventId,
  selectCategories,
  selectLenrEvents,
  selectCurrentEvent,
  selectCurrentEventId
} = lenrEventsFeature;
