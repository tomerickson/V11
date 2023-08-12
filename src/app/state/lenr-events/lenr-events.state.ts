import { createFeature, createReducer, on } from '@ngrx/store';
import { ILenrEventDetail } from 'src/app/core/models/lenr-event-detail.model';
import { actions } from './lenr-events.actions';
import { ILenrEventsRequest, LenrEventsRequest } from 'src/app/core/models/lenr-events-request.model';
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
  formData: {} as LenrEventsRequest,
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
  on(actions.reset, () => {
    return {
      ...initialState
    };
  }),
  on(actions.prefetch, (state) => {
    return {
      ...state,
      eventCount: 0,
      maxEventId: 0,
      categories: [],
      lenrDetails: [],
      error: null
    };
  }),
  on(actions.prefetchSuccess, (state, action) => {
    return {
      ...state,
      eventCount: action.payload.eventCount,
      maxEventId: action.payload.maxId,
      categories: action.payload.categories
    };
  }),
  on(actions.prefetchFailure, (state, action) => {
    return { ...state, loading: false, ready: false, error: action.error };
  }),

  on(actions.fetchSearchResults, (state) => {
    return { ...state, loading: true, ready: false, error: null };
  }),
  on(actions.fetchSearchResultsFailure, (state, action) => {
    return { ...state, loading: false, error: action.error, ready: false };
  }),
  on(actions.fetchSearchResultsSuccess, (state, action) => {
    return {
      ...state,
      lenrEvents: action.payload,
      loading: false,
      ready: true
    };
  }),
  on(actions.findEventId, (state, action) => {
    return {
      ...state,
      currentEventId: action.payload
    };
  }),
  on(actions.loadEventDetail, (state, action) => {
    return {
      ...state,
      loading: true,
      ready: false,
      error: false,
      currentEventId: action.payload.r_id as number
    };
  }),
  on(actions.loadEventDetailFailure, (state, action) => {
    return { ...state, loading: false, ready: false, error: action.error };
  }),
  on(actions.loadEventDetailSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      ready: false,
      error: false,
      currentEvent: action.payload
    };
  })
);

export const feature = createFeature({
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
} = feature;
