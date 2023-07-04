import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { LenrEventDetail } from "src/app/core/models/lenr-event-detail.model";
import { LenrEventsLookup } from "src/app/core/models/lenr-events-lookup.model";

export const LenrEventActions = createActionGroup({
    source: 'LenrEvents API',
    events: {
      'Reset': emptyProps(),
      'Fetch All Results': props<{payload: FormData}>(),
      'Load All Results Success': props<{payload: LenrEventDetail[]}>(),
      'Load All Results Failure': (error: any) => ({error}),
    }
  });
