import { ReactionType } from "./reaction-type";

export interface IReportParameters {
    url: string;
    type: ReactionType;
    query: string;
}