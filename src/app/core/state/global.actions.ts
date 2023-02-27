import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ActionGroup } from "@ngrx/store/src/action_group_creator_models";
import { IElementDataModel } from "../element.data.model";


export const globalActions = createActionGroup({
    source: 'Global API',
    events: {
        Enter: emptyProps(),
        'Load Elements': emptyProps(),
        'Load Elements Success': props<{elements: IElementDataModel[]}>(),
        'Load Elements Failure': (error: any) => ({error})
}});
