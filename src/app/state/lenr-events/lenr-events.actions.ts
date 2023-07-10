import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ILenrEventDetail } from "src/app/core/models/lenr-event-detail.model";
import { ILenrEventsRequest } from "src/app/core/models/lenr-events-request.model";
import { LenrPrefetchProperties } from "./lenr-events.effects";
import { ILenrEventsLookup } from "src/app/core/models/lenr-events-lookup.model";

export const LenrEventActions = createActionGroup({
    source: 'LenrEvents API',
    events: {
      'Reset': emptyProps(),
      'Prefetch': props<{payload: ILenrEventsRequest}>(),
      'Prefetch Success': props<{payload: LenrPrefetchProperties}>(),
      'Prefetch Failure': (error: any) => ({error}),
      'Fetch Search Results': props<{payload: ILenrEventsRequest}>(),
      'Fetch Search Results Success': props<{payload: ILenrEventsLookup[]}>(),
      'Fetch Search Results Failure': (error: any) => ({error}),
      'Find Event Id': props<{payload: number}>(),
      'Load Event Detail': props<{payload: ILenrEventsRequest}>(),
      'Load Event Detail Success': props<{payload: ILenrEventDetail}>(),
      'Load Event Detail Failure': (error: any) => ({error})
    }
  });
