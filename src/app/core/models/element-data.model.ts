import { IDataTransferModel } from "./data-transfer.model";

export interface IElementDataModel extends IDataTransferModel{
  Z: number;
  E: string;
  EName: string;
/*   P: number;
  G: number;
  AWeight: number;
  ARadius: number;
  MolarVolume: number;
  Melting: number;
  Boiling: number;
  Negativity: number;
  Affinity: number;
  Val: number;
  MaxInum: number;
  MaxInize: number;
  STPDensity: number;
  ElectG: number;
  ThermG: number;
  SpecHeat: number;
  ppmECrust: string;
  ppmEStellar: string
  MagType: string;
  CuriePtK: string;
  MagVol: number; */
}
