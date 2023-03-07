import {
  createAction,
  createActionGroup,
  emptyProps,
  props
} from '@ngrx/store';
import { ILookupDataModel } from '../lookup..data.model';
import { IElementDataModel } from '../element.data.model';

export const ElementActions = createActionGroup({
  source: 'Global API',
  events: {
    'Load Elements': emptyProps(),
    'Load Elements Success': props<{ elements: IElementDataModel[] }>(),
    'Load Elements Failure': (error: any) => ({ error }),
    'Set Title': props<{ title: string }>(),
    'Set Credits': props<{ credits: string }>()
  }
});

export const LookupActions = createActionGroup({
  source: 'Global API',
  events: {
    'Load Lookups': emptyProps(),
    'Load Lookups Success': props<{lookups: ILookupDataModel[]}>(),
    'Load Lookups Failure': (error: any) => ({error}),
    'Set Radiation Types': props<{category: string}>(),
    'Set Radiation Decay Modes': props<{category: string}>()
  }
})

export const PageActions = createActionGroup({
  source: 'Global API',
  events: {
    enter: emptyProps(),
    'Set Page Title': props<{ title: string }>(),
    'Set Page Credits': props<{ credits: string }>(),
    exit: emptyProps()
  }
});
