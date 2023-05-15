import { EntityMetadataMap } from "@ngrx/data";
import { IFusionResultsModel } from "../core/models/fusion-results.model";
import { IElementResultsModel } from "../core/models/element-results.model";
import { INuclideResultsModel } from "../core/models/nuclide-results.model";

export const fusionEntityMetaData: EntityMetadataMap = {
    FusionResult: {},
    ElementResult: {
        selectId: (element: IElementResultsModel) => element.E
    },
    NuclideResult: {}
}
