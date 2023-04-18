import { createFeature, createReducer, on } from '@ngrx/store';
import { config } from '../../assets/config';
import elementsJson from '../../assets/tables/elements.json';
import radDecayModesJson from '../../assets/tables/radiationdecaymodes.json';
import radTypesJson from '../../assets/tables/radiationtypes.json';
import { IElementDataModel } from '../core/element.data.model';
import { ILookupDataModel } from '../core/lookup..data.model';
import { ElementActions, LookupActions, PageActions } from './global.actions';
import { ENTITY_CACHE_META_REDUCERS } from '@ngrx/data';

export interface GlobalState {
  pageTitle: string;
  pageCredits: string;
  pageDescription: string;
  showMenu: boolean;
  showMenuText: string;
  elementsReady: boolean;
  elementsLoading: boolean;
  lookupsReady: boolean;
  lookupsLoading: boolean;
  elements: IElementDataModel[];
  lookups: ILookupDataModel[];
  radiationTypes: ILookupDataModel[];
  radiationDecayModes: ILookupDataModel[];
}

const loadElements = () => {

}
export const globalInitialState: GlobalState = {
  pageTitle: '',
  pageCredits: config.pageCredits,
  pageDescription: '',
  showMenu: true,
  showMenuText: 'Hide menu',
  elementsReady: false,
  elementsLoading: false,
  lookupsReady: false,
  lookupsLoading: false,
  elements: elementsJson.map(row => {return {Z: row.z, E: row.e, EName: row.ename}}),
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
    on(PageActions.loadGlobals, (state) => {
      return {
        ...state,
        elements: elementsJson.map(row => {return {Z: row.z, E: row.e, EName: row.ename}}),
        lookups: [],
        radiationDecayModes: radDecayModesJson.map(row => {return {category: 'RDM', code: row.code, description: row.description}}),
        radiationTypes: radTypesJson.map(row => {return {category: 'RT', code: row.code, description: row.description}}),
        elementsLoading: true,
        elementsReady: false,
        lookupsLoading: true,
        lookupsReady: false
      };
    }),
/*     on(PageActions.loadGlobalsSuccess, (state, action) => {
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
    }), */
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
    on(PageActions.setPageDescription, (state, action) => {
      return { ...state, pageDescription: action.description };
    }),
    on(PageActions.toggleMenu, (state) => {
      return {
        ...state,
        showMenuText: state.showMenu ? 'Show menu' : 'Hide menu',
        showMenu: !state.showMenu
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
  selectRadiationTypes,
  selectShowMenu,
  selectShowMenuText
} = globalFeature;
// export const globalSelectors = {};
// export const selectGlobalState = createFeatureSelector<GlobalState>('global');

/**
 * Effects
 */
/* export const fetchElements$ = createEffect(
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
); */
