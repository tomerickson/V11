import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IFusionCompositeResults } from 'src/app/core/models/fusion-composite-results.model';
import { IKeyValuePair } from 'src/app/core/models/key-value-pair.model';

export const FusionActions = createActionGroup({
  source: 'Fusion API',
  events: {
    'Reset': emptyProps(),
    'Fetch All Results': props<{payload: IKeyValuePair[]}>(),
    'Load All Results Success': props<{results: IFusionCompositeResults}>(),
    'Load All Results Failure': (error: any) => ({error}),
    'Load ElementResults': emptyProps(),
    'Load FusionResults': emptyProps(),
    'Load NuclideResults': emptyProps(),
  }
});
