import { CompositeResultsModel } from "./composite-results.model";

export class CascadesAllResultsModel extends CompositeResultsModel {
    
    constructor(html: string, reactionTemplate: string[]) {
        super(html, reactionTemplate);
    }

}