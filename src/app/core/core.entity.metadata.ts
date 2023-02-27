import { EntityMetadataMap } from '@ngrx/data';
import { IElementResultsModel } from './element.results.model';
import { IFusionResultsModel } from './fusion.results.model';
import { INuclideResultsModel } from './nuclide.results.model';
import { RawDataModel } from './raw-data.model';

export const coreEntityMetaData: EntityMetadataMap = {
  RawHtml: {
    selectId: (rawResult: RawDataModel) => 0
  },
  FusionResult: {
    selectId: (fusionResult: IFusionResultsModel) => fusionResult.id
  },
  NuclideResult: {
      selectId: (nuclideResult: INuclideResultsModel) => nuclideResult.id
  },
  ElementResult: {
      selectId: (elementResult: IElementResultsModel) => elementResult.Z
  }
};
