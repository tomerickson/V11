import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ElementDataResultsModel } from "src/app/core/models/element-data-results.model";
import { IElementDataFormModel } from "src/app/core/models/element-data-form.model";

export const actions = createActionGroup({
    source: 'ElementData API',
    events: {
        'Reset': emptyProps(),
        'loadAllResults': props<{payload: IElementDataFormModel}>(),
        'loadAllResultsSuccess': props<{payload: ElementDataResultsModel}>(),
        'loadAllResultsFailure': (error: any) => ({error}),
        'LoadElement': emptyProps(),
        'LoadNuclides': emptyProps(),
        'LoadRadioNuclides': emptyProps(),
    }
})