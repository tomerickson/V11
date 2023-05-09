import { IElementResultsModel } from "./element.results.model";
import { IFusionResultsModel } from "./fusion.results.model";
import { INuclideResultsModel } from "./nuclide.results.model";

export interface IFusionCompositeResults {
    elementResults: IElementResultsModel[];
    fusionResults: IFusionResultsModel[];
    nuclideResults: INuclideResultsModel[];
}