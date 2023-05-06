import { EntityMetadataMap } from '@ngrx/data';
import { IElementResultsModel } from './models/element.results.model';
import { IFusionResultsModel } from './models/fusion.results.model';
import { INuclideResultsModel } from './models/nuclide.results.model';
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
