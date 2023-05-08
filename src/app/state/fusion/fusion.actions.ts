import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IElementResultsModel } from 'src/app/core/models/element.results.model';
import { IFusionResultsModel } from 'src/app/core/models/fusion.results.model';
import { INuclideResultsModel } from 'src/app/core/models/nuclide.results.model';

export const FusionActions = createActionGroup({
  source: 'Fusion API',
  events: {
    'Fetch All Results': props<{payload: FormData}>(),
    'Load All Results Success': props<{
      elements: IElementResultsModel[];
      fusions: IFusionResultsModel[];
      nuclides: INuclideResultsModel[];
    }>(),
    'Load All Results Failure': (error: any) => ({error}),
    'Load ElementResults': emptyProps(),
    'Load FusionResults': emptyProps(),
    'Load NuclideResults': emptyProps(),
  }
});
