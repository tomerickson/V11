import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createFeature, createReducer, on } from '@ngrx/store';
import { catchError, exhaustMap, map, of } from 'rxjs';
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
    on(PageActions.enter, (state, action) => {
      return { ...state };
    }),
    on(PageActions.loadGlobals, (state, action) => {
      return {
        ...state,
        elements: [],
        lookups: [],
        radiationDecayModes: [],
        radiationTypes: [],
        elementsLoading: true,
        elementsReady: false,
        lookupsLoading: true,
        lookupsReady: false
      };
    }),
    on(PageActions.loadGlobalsSuccess, (state, action) => {
      return {
        ...state,
        elements: action.results.elements,
        lookups: action.results.lookups,
        radiationDecayModes: action.results.lookups.filter(
          (item) => item.category === 'RDM'
        ),
        radiationTypes: action.results.lookups.filter(
          (item) => item.category === 'RT'
        ),
        elementsLoading: false,
        elementsReady: true,
        lookupsLoading: false,
        lookupsReady: true
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
      exhaustMap(() => {
        return http.getGlobalData().pipe(
          map((results) => PageActions.loadGlobalsSuccess({ results })),
          catchError((error) => of(PageActions.loadGlobalsFailure({ error })))
        );
      })
    );
  },
  { functional: true }
);
