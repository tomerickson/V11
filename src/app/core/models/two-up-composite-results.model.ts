import { IElementResultsModel } from './element-results.model';
import { INuclideResultsModel } from './nuclide-results.model';
import { ITwoUpResultsModel } from './two-up-results.model';

export interface ITwoUpCompositeResults {
  reactionResults: ITwoUpResultsModel[];
  nuclideResults: INuclideResultsModel[];
  elementResults: IElementResultsModel[];
  ok: boolean;
}
