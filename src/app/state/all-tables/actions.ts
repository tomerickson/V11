import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { AllTablesResultsModel } from "src/app/core/models/all-tables-results.model";

export const actions = createActionGroup({
    source: 'AllTables API',
    events: {
        'Reset': emptyProps(),
        'Request Page': emptyProps(),
        'Request Page Success': props<{payload: string}>(),
        'Request Page Failure': (error: any) => ({error}),
        'Load Results': props<{query: string}>(),
        'Load Results Success': props<{payload: AllTablesResultsModel}>(),
        'Load Results Failure': (error: any) => ({error})
    }
})