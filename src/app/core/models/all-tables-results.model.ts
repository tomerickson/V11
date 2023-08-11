import { CompositeResultsModel } from "./composite-results.model";

export class AllTablesResultsModel extends CompositeResultsModel {
    
    constructor(html: string, reactionTemplate: string[]) {
        super(html, reactionTemplate);
    }
}