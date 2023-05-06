import { IElementDataModel } from "./element.data.model";
import { IFusionResultsModel } from "./fusion.results.model";
import { INuclideResultsModel } from "./nuclide.results.model";

export interface IFusionCompositeResults {
    fusioonResults: IFusionResultsModel[];
    elementResults: IElementDataModel[];
    nuclideResults: INuclideResultsModel[];
}