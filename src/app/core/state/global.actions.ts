import {
  createAction,
  createActionGroup,
  emptyProps,
  props
} from '@ngrx/store';
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

export const PageActions = createActionGroup({
  source: 'Global API',
  events: {
    'Set Page Title': props<{ title: string }>(),
    'Set Page Credits': props<{ credits: string }>(),
    Exit: emptyProps()
  }
});
