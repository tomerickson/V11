import { createFeature, createReducer, on } from '@ngrx/store';
// import globalConfigs from '../../assets/config/global-config.json';
import elementsJson from '../../assets/tables/elements.json';
import radDecayModesJson from '../../assets/tables/radiation-decay-modes.json';
import radTypesJson from '../../assets/tables/radiation-types.json';
import fuelFeedbackJson from '../../assets/tables/reaction-feedback-modes.json';
import sortFieldsJson from '../../assets/tables/reaction-result-sort-fields.json';
import { IElementDataModel } from '../core/models/element-data.model';
import { ILookupDataModel } from '../core/models/lookup-data.model';
import { ReportParameters } from '../core/models/report-parameters.model';
import { actions } from './global.actions';
export interface GlobalState {
  version: string,
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
  reactionSortFields: ILookupDataModel[];
  fuelFeedbackModes: ILookupDataModel[];
  reportParameters: ReportParameters;
}

export const globalInitialState: GlobalState = {
  version: '',
  pageTitle: '',
  pageCredits: '',
  pageDescription: '',
  showMenu: true,
  showMenuText: 'Hide menu',
  elementsReady: false,
  elementsLoading: false,
  lookupsReady: false,
  lookupsLoading: false,
  elements: elementsJson.map((row) => {
    return { Z: row.z, E: row.e, EName: row.ename };
  }),
  lookups: [],
  radiationDecayModes: radDecayModesJson.map((row) => {
    return { category: 'RDM', code: row.code, description: row.description };
  }),
  radiationTypes: radTypesJson.map((row) => {
    return { category: 'RT', code: row.code, description: row.description };
  }),
  reactionSortFields: sortFieldsJson.map((row) => {
    return { category: 'SORT', code: row.code, description: row.description };
  }),
  fuelFeedbackModes: fuelFeedbackJson.map(row => {
    return {category: 'FEEDBACK', code: row.code, description: row.description};
  }),
  reportParameters: {} as ReportParameters
};

export const feature = createFeature({
  name: 'global',
  reducer: createReducer(
    globalInitialState,
    on(actions.initializeSuccess, (state, actions) => {
      return {...state,
        version: actions.payload.version,
        production: actions.payload.production,
        proxy: actions.payload.proxy,
        apiUrl: actions.payload.apiUrl,
        virtualDirectory: actions.payload.virtualDirectory,
        httpMaxRetries: actions.payload.httpMaxRetries,
        httpRetryDelay: actions.payload.httpRetryDelay,
        pageCredits: actions.payload.pageCredits,
        allTablesPageSize: actions.payload.allTablesPageSize
      }
    }),
    on(actions.loadElements, (state) => {
      return {
        ...state,
        elementsReady: false,
        elementsLoading: true,
        elements: []
      };
    }),
    on(actions.loadElementsFailure, (state) => {
      return {
        ...state,
        elementsReady: false,
        elementsLoading: false,
        elements: []
      };
    }),
    on(actions.loadElementsSuccess, (state, action) => {
      return {
        ...state,
        elementsReady: true,
        elementsLoading: false,
        elements: action.elements
      };
    }),
    on(actions.loadLookups, (state) => {
      return {
        ...state,
        lookupsReady: false,
        lookupsLoading: true,
        lookups: []
      };
    }),
    on(actions.loadLookupsFailure, (state) => {
      return {
        ...state,
        lookupsReady: false,
        lookupsLoading: false,
        lookups: []
      };
    }),
    on(actions.loadLookupsSuccess, (state, action) => {
      return {
        ...state,
        lookupsReady: true,
        lookupsLoading: false,
        lookups: action.lookups
      };
    }),
    on(actions.enter, (state, action) => {
      return { ...state };
    }),
    on(actions.loadGlobals, (state) => {
      return {
        ...state,
        elements: elementsJson.map((row) => {
          return { Z: row.z, E: row.e, EName: row.ename };
        }),
        lookups: [],
        lookupsLoading: true,
        lookupsReady: false
      };
    }),
    on(actions.setPageTitle, (state, action) => {
      return {
        ...state,
        pageTitle: action.title
      };
    }),
    on(actions.setPageCredits, (state, action) => {
      return {
        ...state,
        pageCredits: action.credits
      };
    }),
    on(actions.setPageDescription, (state, action) => {
      return { ...state, pageDescription: action.description };
    }),
    on(actions.toggleMenu, (state) => {
      return {
        ...state,
        showMenuText: state.showMenu ? 'Show menu' : 'Hide menu',
        showMenu: !state.showMenu
      };
    }),
    on(actions.setReportParameters, (state, action) => {
      return { ...state, reportParameters: action.payload };
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
  // selectPageCredits,
  selectPageTitle,
  selectRadiationDecayModes,
  selectRadiationTypes,
  selectReactionSortFields,
  selectReportParameters,
  selectShowMenu,
  selectShowMenuText
} = feature;

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
