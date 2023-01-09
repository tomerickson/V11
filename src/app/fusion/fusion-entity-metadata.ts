import { EntityMetadataMap } from "@ngrx/data";
import { IFusionResultsModel } from "../core/fusion.results.model";
import { ElementResultsModel } from "../core/element.results.model";
import { NuclideResultsModel } from "../core/nuclide.results.model";

export const fusionEntityMetaData: EntityMetadataMap = {
    FusionResult: {},
    ElementResult: {
        selectId: (element: ElementResultsModel) => element.E
    },
    NuclideResult: {}
}
