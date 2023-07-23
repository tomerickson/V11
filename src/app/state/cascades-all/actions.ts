import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ICascadesAllRequestModel } from "src/app/cascades/cascades-all-request.model";
import { KeyValuePair } from "src/app/core/models/key-value-pair.model";

export const CascadesAllActions = createActionGroup({
    source: 'CascadesAll API',
    events: {
        'Reset': emptyProps(),
        'Fetch All Results': props<{payload: KeyValuePair[]}>(),
        'Fetch All Results Success': props<{link: string}>(),
        'Fetch All Results Failure': (error: any) => ({error}),
        'Load All Results': emptyProps(),
        'Load All Results Success': props<{results: any[][]}>(),
        'Load All Results Failure': (error: any) => ({error}),
        'Load ElementResults': emptyProps(),
        'Load FusionResults': emptyProps(),
        'Load NuclideResults': emptyProps(),
    }
})