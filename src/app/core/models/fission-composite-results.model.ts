import { IFissionResultsModel } from './fission-results.model';

export interface IFissionCompositeResults {
  reactionResults: IFissionResultsModel[];
  nuclideResults: any[];
  elementResults: any[];
  ok: boolean;
}