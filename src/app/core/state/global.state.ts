import { createFeature, createReducer, on } from '@ngrx/store';
import { IElementDataModel } from '../element.data.model';
import { globalActions } from './global.actions';

interface GlobalState {
  ready: boolean;
  loading: boolean;
  elements: IElementDataModel[];
}

const initialState: GlobalState = {
  ready: false,
  loading: false,
  elements: []
};

export const globalReducer = createReducer(
  initialState,
  on(globalActions.enter, (state) => ({...initialState})),
  on(globalActions.loadElements, (state) => ({...state, loading: true, ready: false})),
  on(globalActions.loadElementsSuccess, (state, {elements}) => ({ ...state, loading: false, ready: true, elements: elements }))
  );

  export const globalSelectors = {};;
  export const globalFeatureSelector = {};
export const globalFeature = createFeature({
  name: 'global',
  reducer: globalReducer
});
