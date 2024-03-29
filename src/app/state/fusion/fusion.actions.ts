import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IFusionCompositeResults } from 'src/app/core/models/fusion-composite-results.model';
import { KeyValuePair } from 'src/app/core/models/key-value-pair.model';

export const actions = createActionGroup({
  source: 'Fusion API',
  events: {
    'Reset': emptyProps(),
    'Fetch All Results': props<{payload: KeyValuePair[]}>(),
    'Load All Results Success': props<{results: IFusionCompositeResults}>(),
    'Load All Results Failure': (error: any) => ({error}),
    'Load ElementResults': emptyProps(),
    'Load FusionResults': emptyProps(),
    'Load NuclideResults': emptyProps(),
  }
});
