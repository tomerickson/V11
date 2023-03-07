import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createFeature, createReducer, on
} from '@ngrx/store';
import { exhaustMap, map } from 'rxjs';
import { CrudService } from '../crud.service';
import { IElementDataModel } from '../element.data.model';
import { ILookupDataModel } from '../lookup..data.model';
import { ElementActions, LookupActions, PageActions } from './global.actions';

export interface GlobalState {
  pageTitle: string | null;
  pageCredits: string | null;
  elementsReady: boolean;
  elementsLoading: boolean;
  lookupsReady: boolean;
  lookupsLoading: boolean;
  elements: IElementDataModel[];
  lookups: ILookupDataModel[];
  radiationTypes: ILookupDataModel[];
  radiationDecayModes: ILookupDataModel[];
}

export const globalInitialState: GlobalState = {
  pageTitle: null,
  pageCredits: null,
  elementsReady: false,
  elementsLoading: false,
  lookupsReady: false,
  lookupsLoading: false,
  elements: [],
  lookups: [],
  radiationTypes: [],
  radiationDecayModes: []
};

export const globalFeature = createFeature({
  name: 'global',
  reducer: createReducer(
    globalInitialState,
    on(ElementActions.loadElements, (state, action) => {
      return {
        ...state,
        elementsReady: false,
        elementsLoading: true,
        elements: []
      };
    }),
    on(ElementActions.loadElementsFailure, (state) => {
      return {
        ...state,
        elementsReady: false,
        elementsLoading: false,
        elements: []
      };
    }),
    on(ElementActions.loadElementsSuccess, (state, action) => {
      return {
        ...state,
        elementsReady: true,
        elementsLoading: false,
        elements: action.elements
      };
    }),
    on(LookupActions.loadLookups, (state) => {
      return {
        ...state,
        lookupsReady: false,
        lookupsLoading: true,
        lookups: []
      };
    }),
    on(LookupActions.loadLookupsFailure, (state) => {
      return {
        ...state,
        lookupsReady: false,
        lookupsLoading: false,
        lookups: []
      };
    }),
    on(LookupActions.loadLookupsSuccess, (state, action) => {
      return {
        ...state,
        lookupsReady: true,
        lookupsLoading: false,
        lookups: action.lookups,
        radiationDecayModes: action.lookups.filter(
          (item) => item.category === 'RDM'
        ),
        radiationTypes: action.lookups.filter((item) => item.category === 'RT')
      };
    }),
    on(PageActions.setPageTitle, (state, action) => {
      return {
        ...state,
        pageTitle: action.title
      };
    }),
    on(PageActions.setPageCredits, (state, action) => {
      return {
        ...state,
        pageCredits: action.credits
      };
    }),
    on(LookupActions.setRadiationDecayModes, (state, action) => {
      return {
        ...state,
        radiationDecayModes: state.lookups.filter(
          (f) => f.category == action.category
        )
      };
    }),
    on(LookupActions.setRadiationTypes, (state, action) => {
      return {
        ...state,
        radiationTypes: state.lookups.filter(
          (f) => f.category == action.category
        )
      };
    })
  )
});

export const {
  selectElements,
  selectElementsLoading,
  selectElementsReady,
  selectLookups,
  selectLookupsLoading,
  selectLookupsReady,
  selectPageCredits,
  selectPageTitle,
  selectRadiationDecayModes,
  selectRadiationTypes
} = globalFeature;
// export const globalSelectors = {};
// export const selectGlobalState = createFeatureSelector<GlobalState>('global');

/**
 * Effects
 */
export const fetchElements$ = createEffect(
  (actions$ = inject(Actions)) => {
    const http = inject(CrudService);

    return actions$.pipe(
      ofType(PageActions.enter),
      exhaustMap(() =>
        http
          .getElements()
          .pipe(map((elements) => ElementActions.loadElements()))
      )
    );
  },
  { functional: false }
);
