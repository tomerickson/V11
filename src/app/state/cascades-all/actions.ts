import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ICascadesAllForm } from "src/app/core/models/cascades-all-form.model";

export const CascadesAllActions = createActionGroup({
    source: 'CascadesAll API',
    events: {
        'Reset': emptyProps(),
        'Fetch All Results': props<{payload: ICascadesAllForm}>(),
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