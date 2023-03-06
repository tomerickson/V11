import {
  createActionGroup,
  createFeature,
  createFeatureSelector,
  createReducer,
  createSelector,
  createSelectorFactory,
  emptyProps,
  on,
  props
} from '@ngrx/store';
import { IElementDataModel } from '../element.data.model';
import { ElementActions, PageActions } from './global.actions';

export interface GlobalState {
  pageTitle: string | null;
  pageCredits: string | null;
  elementsReady: boolean;
  elementsLoading: boolean;
  elements: IElementDataModel[];
}

export const globalInitialState: GlobalState = {
  pageTitle: null,
  pageCredits: null,
  elementsReady: false,
  elementsLoading: false,
  elements: []
};

export const globalReducer = createReducer(
  globalInitialState,
  on(ElementActions.loadElements, (state, action) => {
    return {
      ...state, elementsReady: false, elementsLoading: true, elements: []
    }
  }),
  on(ElementActions.loadElementsFailure, (state, action) => {
    return {
      ...state, elementsReady: false, elementsLoading: false, elements: []
      }
    }
  ),
  on(ElementActions.loadElementsSuccess, (state, action) => {
    return {
      ...state, elementsReady: true, elementsLoading: false, elements: action.elements
    }
  }),
  on(PageActions.setPageTitle, (state, action) => {
    return {
      ...state, pageTitle: action.title
    }
  }),
  on(PageActions.setPageCredits, (state, action) => {
    return {
      ...state, pageCredits: action.credits
    }
  }));


export const globalSelectors = {};
export const globalFeatureSelector = createFeatureSelector<GlobalState>('global');
/*
export const globalFeature = createFeature({
  name: 'global',
  reducer: globalReducer
});
*/