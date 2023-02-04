import { SpinClassification } from './custom.types';

export interface IFusionRequestModel {
  execute_query: string;
  query: string;
  table_name: 'FusionAll' | 'FusionAllNewPlus';
  sql_tables: 'left' | 'none' | 'right'; // Tick neutrino (nu) contributions to be included (default is all three)
  NuclearSpinFilterLeftnBorF1_filter: SpinClassification; // Boson, Fermion or eigher
  aBorF1_filter: SpinClassification;
  nBorF2_filter: SpinClassification;
  aBorF2_filter: SpinClassification;
  nBorF_filter: SpinClassification;
  aBorF_filter: SpinClassification;
}
