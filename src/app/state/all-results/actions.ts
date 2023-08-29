import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { AllTablesResultsModel } from "src/app/core/models/all-tables-results.model";

export const actions = createActionGroup({
    source: 'AllResults API',
    events: {
        'Reset': emptyProps(),
        'Load Results': props<{query: string}>(),
        'Load Results Success': props<{payload: AllTablesResultsModel}>(),
        'Load Results Failure': (error: any) => ({error})
    }
})