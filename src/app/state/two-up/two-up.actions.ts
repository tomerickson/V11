import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { KeyValuePair } from 'src/app/core/models/key-value-pair.model';
import { ITwoUpCompositeResults } from 'src/app/core/models/two-up-composite-results.model';

export const TwoUpActions = createActionGroup({
  source: 'TwoUp API',
  events: {
    'Reset': emptyProps(),
    'Fetch All Results': props<{payload: KeyValuePair[]}>(),
    'Load All Results Success': props<{results: ITwoUpCompositeResults}>(),
    'Load All Results Failure': (error: any) => ({error}),
    'Load ElementResults': emptyProps(),
    'Load FusionResults': emptyProps(),
    'Load NuclideResults': emptyProps(),
  }
});
