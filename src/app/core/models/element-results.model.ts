import { IDataTransferModel } from "./data-transfer.model";

export interface IElementResultsModel extends IDataTransferModel{
    Z: number,
    E: string,
    EName: string,
    P: number,
    G: number,
    AWeight: number,
    ARadius: number,
    MolarVol: number,
    Melting: number,
    Boiling: number,
    Negativity: number,
    Affinity: number,
    Val: number,
    MxInum: number,
    MxInize: number,
    STPDensity: number,
    ElectG: number,
    ThermG: number,
    SpecHeat: number,
    ppmECrust: number,
    ppmEStellar: number,
    MagType: string,
    CuriePtK: number,
    MagVolSus: number
}
