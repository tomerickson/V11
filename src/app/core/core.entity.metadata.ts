import { EntityMetadataMap } from '@ngrx/data';
import { ElementResultsModel } from './element.results.model';
import { FusionResultsModel } from './fusion.results.model';
import { NuclideResultsModel } from './nuclide.results.model';
export const coreEntityMetaData: EntityMetadataMap = {
  FusionReult: {
    selectId: (fusionResult: FusionResultsModel) => fusionResult.id
  },
  NuclideResult: {
      selectId: (nuclideResult: NuclideResultsModel) => nuclideResult.id
  },
  ElementResult: {
      selectId: (elementResult: ElementResultsModel) => elementResult.Z
  }
};
