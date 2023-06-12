import { ReactionType } from "./reaction-type";
import { ReactionTypeEnum } from "./reaction-type-enum.model";

export class ReportParameters {
    url: string;
    reactionType: ReactionTypeEnum;
    query: string;

    constructor(url: string, type: ReactionTypeEnum, query: string) {
        this.url = url;
        this.reactionType = type;
        this.query = query;
    }
}