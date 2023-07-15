import { Injectable, inject } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { ILenrEventDetail } from '../core/models/lenr-event-detail.model';
import {
  ILenrEventsRequest,
  LenrEventsRequest
} from '../core/models/lenr-events-request.model';
import { CrudService } from '../core/services/crud.service';
import { getFormData, getFormDataString } from '../core/services/helpers';
import { LenrEventsPrefetchModel } from '../core/models/lenr-events-prefetch.model.';
import { ILenrEventsLookup } from '../core/models/lenr-events-lookup.model';
import { LenrEventsPageScraperService } from './lenr-events-page-scraper.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class EventServices {
  crud = inject(CrudService);
  readonly page = 'Select_LENR_Events.php';

  htmlToDocument(html: string): Document {
    const parser = new DOMParser();
    let doc = parser.parseFromString(html, 'text/html');
    const body: string = doc.activeElement?.outerHTML ?? '';

    let dom = document.implementation.createHTMLDocument();
    dom.documentElement.innerHTML = '<head></head>' + body;
    return dom
  }

  getEventsPage(): Observable<string> {
    return this.crud.getPage(this.page);
  }

  postEventPage(request: ILenrEventsRequest): Observable<string> {
    const form = getFormDataString(request);
    const headers: HttpHeaders = new HttpHeaders()
     .set('Accept', 'text/html')
     .set('Content-Type','application/x-www-form-urlencoded');

  
    return this.crud.postPage(this.page, form, headers);
  }

  parseEventDetail(html: string, eventId: number | null): ILenrEventDetail {
    const page = new LenrEventsPageScraperService(html);
    const detail = page.detail;
    if (eventId) detail.id = eventId;
    return detail;
  }

  /**
   * @param document
   * @returns event count, max event id and options
   * @description
   * Can't use xpath expressions here due to malformed html
   */
  preFetchProperty = (payload: LenrEventsRequest): Observable<string> => {
    return this.getEventsPage();
  };

  /**
   *
   * Fetch the postback response from Select_LENR_Events
   *
   * @param document
   * @returns: list of events
   */
  parseEventList(html: string): ILenrEventsLookup[] {
    const page = new LenrEventsPageScraperService(html);
    return page.events;
  }
  /**
   * Find the elements on the Select_LENR_Events page
   * that we need to drive the UI:
   *
   * This is driven by the OnInit handler of LenrEventsHeadComponent
   *
   * @param html
   * @returns {
   *     eventCount: number | null;
   *     maxId: number | null;
   *     categories: (string | null)[];  }
   */
  parseProperties = (html: string): LenrEventsPrefetchModel => {
    const page = new LenrEventsPageScraperService(html);
    const props = {} as LenrEventsPrefetchModel;
    props.eventCount = page.eventCount;
    props.maxId = page.maxId;
    props.categories = page.categories;
    return props;
  };
}
