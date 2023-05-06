import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IElementResultsModel } from 'src/app/core/models/element.results.model';
import { IFusionResultsModel } from 'src/app/core/models/fusion.results.model';
import { INuclideResultsModel } from 'src/app/core/models/nuclide.results.model';

export const FusionActions = createActionGroup({
  source: 'Fusion API',
  events: {
    'Load ElementResults': emptyProps(),
    'Load ElementResults Success': props<{
      elements: IElementResultsModel[];}>(),
    'Load ElementResults Failure': (error: any) => ({ error }),
    'Load FusionResults': emptyProps(),
    'Load NuclideResults': emptyProps(),
    'Load NuclideResults Success': props<{elements: INuclideResultsModel[];}>(),
    'Load NuclideResults Failure': (error: any) => ({ error }),
    'Load FusionResults': emptyProps(),
    'Load FusionResults Success': props<{ elements: IFusionResultsModel[] }>(),
    'Load FusionResults Failure': (error: any) => ({ error })
  }
});
