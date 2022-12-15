import { EntityMetadataMap } from '@ngrx/data';
import { ElementResultsModel } from './element.results.model';
import { FusionResultsModel } from './fusion.results.model';
import { NuclideResultsModel } from './nuclide.results.model';
import { RawDataModel } from './raw-data.model';

export const coreEntityMetaData: EntityMetadataMap = {
  RawHtml: {
    selectId: (rawResult: RawDataModel) => 0
  },
  FusionResult: {
    selectId: (fusionResult: FusionResultsModel) => fusionResult.id
  },
  NuclideResult: {
      selectId: (nuclideResult: NuclideResultsModel) => nuclideResult.id
  },
  ElementResult: {
      selectId: (elementResult: ElementResultsModel) => elementResult.Z
  }
};
