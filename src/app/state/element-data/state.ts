import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { IElementDataFormModel } from 'src/app/core/models/element-data-form.model';
import { actions } from './actions';

export interface ElementDataState {
  formData: IElementDataFormModel | null;
  loading: boolean;
  ready: boolean;
  error: any;
  link: string | null;
  radioNuclides: any[];
  nuclides: any[];
  elements: any[];
}

export const elementDataInitialState: ElementDataState = {
  formData: null,
  loading: false,
  ready: false,
  error: null,
  link: null,
  radioNuclides: [],
  nuclides: [],
  elements: [],
};

export const elementDataReducer = createReducer(
  elementDataInitialState,
  on(actions.reset, () => {
    return {
      ...elementDataInitialState
    };
  }),
  on(actions.loadAllResults, (state) => {
    return {
      ...state,
      loading: true,
      ready: false,
      error: null,
      radioNuclides: [],
      nuclides: [],
      elements: [],
    };
  }),
  on(actions.loadAllResultsSuccess, (state, action) => {
    return {
      ...state,
      ready: true,
      loading: false,
      radioNuclides: action.payload.radioNuclideResults,
      nuclides: action.payload.nuclideResults,
      elements: action.payload.elementResults
    };
  }),
  on(actions.loadAllResultsFailure, (state, action) => {
    return { ...state, loading: false, error: action.error };
  })
);

export const feature = createFeature({
  name: 'element-data',
  reducer: elementDataReducer,
  extraSelectors: ({
    selectRadioNuclides,
    selectNuclides,
    selectElements
  }) => ({
    selectRadioNuclideRows: createSelector(
      selectRadioNuclides,
      (r) => r.length
    ),
    selectNuclideRows: createSelector(selectNuclides, (n) => n.length),
    selectElementRows: createSelector(selectElements, (e) => e.length)
  })
});

export const {
  selectFormData,
  selectLoading,
  selectReady,
  selectError,
  selectLink,
  selectNuclides,
  selectRadioNuclides,
  selectElements,
  selectRadioNuclideRows,
  selectNuclideRows,
  selectElementRows
} = feature;
