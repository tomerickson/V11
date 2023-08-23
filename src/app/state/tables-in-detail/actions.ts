import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const actions = createActionGroup({
    source: 'TablesInDetail API',
    events: {
        'reset': emptyProps(),
        'fetchPage': emptyProps(),
        'fetchPageSuccess': props<{payload: string}>(),
        'fetchPageFailure': (error: any) => ({error})  
    }
})