import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IFissionCompositeResults } from 'src/app/core/models/fission-composite-results.model';
import { KeyValuePair } from 'src/app/core/models/key-value-pair.model';

export const actions = createActionGroup({
  source: 'Fission API',
  events: {
    'Reset': emptyProps(),
    'Fetch All Results': props<{payload: KeyValuePair[]}>(),
    'Load All Results Success': props<{results: IFissionCompositeResults}>(),
    'Load All Results Failure': (error: any) => ({error}),
    'Load ElementResults': emptyProps(),
    'Load FissionResults': emptyProps(),
    'Load NuclideResults': emptyProps(),
  }
});
