import { EntityMetadataMap } from "@ngrx/data";
import { IFusionResultsModel } from "../core/fusion.results.model";
import { IElementResultsModel } from "../core/element.results.model";
import { INuclideResultsModel } from "../core/nuclide.results.model";

export const fusionEntityMetaData: EntityMetadataMap = {
    FusionResult: {},
    ElementResult: {
        selectId: (element: IElementResultsModel) => element.E
    },
    NuclideResult: {}
}
