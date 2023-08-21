import { CompositeResultsModel } from "./composite-results.model";

export class ElementDataResultsModel extends CompositeResultsModel {

    constructor(html: string, reactionTemplate: string[]) {
        super(html, reactionTemplate, 1);
    }
}