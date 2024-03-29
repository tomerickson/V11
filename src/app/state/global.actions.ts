import {
  createActionGroup,
  emptyProps,
  props
} from '@ngrx/store';
import { ILookupDataModel } from '../core/models/lookup-data.model';
import { IElementDataModel } from '../core/models/element-data.model';
import { ReportParameters } from '../core/models/report-parameters.model';
import { IAppConfig } from '../core/config/iapp-config.model';

export const actions = createActionGroup({
  source: 'Global API',
  events: {
    enter: emptyProps(),
    'Initialize': emptyProps(),
    'InitializeSuccess': props<{payload: IAppConfig}>(),
    'InitializeFailure': (error: any) => ({error}),
    'Load Globals': emptyProps(),
    'Set Page Title': props<{ title: string }>(),
    'Set Page Credits': props<{ credits: string }>(),
    'Set Page Description': props<{description: string}>(),
    'Set Report Parameters': props<{payload: ReportParameters}>(),
    'Toggle Menu': emptyProps(),
    'Load Lookups': emptyProps(),
    'Load Lookups Success': props<{lookups: ILookupDataModel[]}>(),
    'Load Lookups Failure': (error: any) => ({error}),
    'Load Elements': emptyProps(),
    'Load Elements Success': props<{ elements: IElementDataModel[] }>(),
    'Load Elements Failure': (error: any) => ({ error }),
    'Set Title': props<{ title: string }>(),
    'Set Credits': props<{ credits: string }>(),
    exit: emptyProps()
  }
});
