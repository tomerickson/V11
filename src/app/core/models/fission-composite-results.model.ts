import { IFissionResultsModel } from './fission-results.model';

export interface IFissionCompositeResults {
  fissionResults: IFissionResultsModel[];
  nuclideResults: any[];
  elementResults: any[];
  ok: boolean;
}