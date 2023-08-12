import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ICascadesAllForm } from "src/app/core/models/cascades-all-form.model";
import { CascadesAllResultsModel } from "src/app/core/models/cascades-all-results.model";

export const actions = createActionGroup({
    source: 'CascadesAll API',
    events: {
        'Reset': emptyProps(),
        'Request All Results': props<{payload: ICascadesAllForm}>(),
        'Request All Results Success': props<{payload: ICascadesAllForm}>(),
        'Request All Results Failure': (error: any) => ({error}),
        'Fetch All Results': props<{payload: ICascadesAllForm}>(),
        'Fetch All Results Success': props<{link: string}>(),
        'Fetch All Results Failure': (error: any) => ({error}),
        'Load All Results': props<{url: string}>(),
        'Load All Results Success': props<{payload: CascadesAllResultsModel}>(),
        'Load All Results Failure': (error: any) => ({error}),
        'Load ElementResults': emptyProps(),
        'Load FusionResults': emptyProps(),
        'Load NuclideResults': emptyProps(),
    }
})