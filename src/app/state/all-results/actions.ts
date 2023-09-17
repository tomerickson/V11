import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { AllResultsResponseModel } from "src/app/core/models/all-results-response.model";
import { PageNavigator } from "src/app/shared/models/page-navigator";

export const actions = createActionGroup({
    source: 'AllResults API',
    events: {
        'Reset': emptyProps(),
        'loadResults': props<{query: string}>(),
        'loadResultsSuccess': props<{payload: AllResultsResponseModel}>(),
        'loadResultsFailure': (error: any) => ({error}),
        'refreshResults': props<{sort: string}>(),
        'setPage': props<{payload: PageNavigator}>()
        }
})