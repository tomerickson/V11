import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IFusionCompositeResults } from 'src/app/core/models/fusion-composite-results.model';

export const FusionActions = createActionGroup({
  source: 'Fusion API',
  events: {
    'Fetch All Results': props<{payload: FormData}>(),
    'Load All Results Success': props<{results: IFusionCompositeResults}>(),
    'Load All Results Failure': (error: any) => ({error}),
    'Load ElementResults': emptyProps(),
    'Load FusionResults': emptyProps(),
    'Load NuclideResults': emptyProps(),
  }
});
