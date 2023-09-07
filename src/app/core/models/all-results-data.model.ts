import { IDataTransferModel } from "./data-transfer.model";

export interface IAllResultsDataModel extends IDataTransferModel {
query: string;
size: number;
date: Date;
link: string;
}