import { Injectable, computed, signal } from "@angular/core";
import { ILenrEventsLookup } from "../core/models/lenr-events-lookup.model";
import { LenrEventsRequest } from "../core/models/lenr-events-request.model";

@Injectable()
export class LenrEventsSignals {

    /** Navigation signals
     * 
     */
    eventList = signal<ILenrEventsLookup[]>([]);
    currentEventId = signal<number>(0);
    backToList = signal(false);
    nextId = computed(() => {
        let id = 0;
        if (this.currentEventId() > 0 && this.eventList()) 
        {
            const index = this.eventList().findIndex(item => item.id === this.currentEventId());
           id = (index < this.eventList().length-1) ? this.eventList()[index+1].id : 0;
        }
        return id;
    })
    priorRow = computed(() => {
        let id = 0;
        if (this.currentEventId() > 0 && this.eventList()) 
        {
            const index = this.eventList().findIndex(item => item.id === this.currentEventId());
           id = (index > 0) ? this.eventList()[index-1].id : 0;
        }
        return id;
    })

    /** Action signals
     * 
     */
    goBack = signal(false);
    goPrior = signal(false);
    goNext = signal(false);
    fetch = signal<LenrEventsRequest>({} as LenrEventsRequest);
}