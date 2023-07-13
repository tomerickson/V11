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
     .set('accept', 'text/html')
     .set('content-type','application/x-www-form-urlencoded');

  
    return this.crud.postPage(this.page, form, headers);
  }

  fetchEventDetails = (): Observable<ILenrEventDetail[]> => {
    const blob = `<input type = 'text' id = 'Category' name = 'Category' size = '25' value = "Video" />
    &nbsp;&nbsp;&nbsp;&nbsp;Year of Publication: <input type = 'text' id = 'Year' name = 'Year' size = '6' value = "2022" />
    &nbsp;&nbsp;&nbsp;&nbsp;Database Index: <input type = 'text' name = 'r_id_copy'  size = '6' value = '4998' readonly /></p><p>Author (last name, initials) or comma-separated list of Authors</p><p><input type = 'text' id = 'Author' name = 'Author' size = '110' value = "Greenyer, R. W." />
    </p>
    <p>Title: The formal title of this entry, if applicable<br/><p><input type = 'text' id = 'Title' name = 'Title' size = '110' value = "Fractal Toroidal Moment Induced Transformation Reactions - A Coherent Matter Driven Process - V02" />
    </p><p>Journal Title: Title of the Journal, Proceedings, Book, etc</p><p><input type = 'text' id = 'Journal_Title' name = 'Journal_Title' size = '110' value = "27th Russian Cold Nuclear Transmutation and Ball Lightning conference 2022" />
    </p><p>Editor (last name, initials) of the collective work, or comma-separated list of Editors</p><p><input type = 'text' id = 'Editor' name = 'Editor' size = '110' value = "" />
    </p>
    <p>Publisher of the Journal, Proceedings, Book, etc<br/><p><input type = 'text' id = 'Publisher' name = 'Publisher' size = '110' value = "" />
    </p><p>City hosting research, conference, etc: <input type = 'text' id = 'City' name = 'City' size = '40' value = "" />
    </p>
    <p>Publishing date or span of dates of conference: <input type = 'text' id = 'Date' name = 'Date' size = '40' value = "" />
    </p><p>Comment: Informed comments, by-lines and info not captured elsewhere.</p><p><textarea name = 'Comment', rows = '3', cols = 100>Slides may be downloaded here:
    https://drive.google.com/file/d/1TCNjfyoKPLY1Knu1AIwUvBIzd0fmOhaG/view?usp=sharing</textarea></p><p>Keywords: A comma separated list of keywords or short phrases</p><p><input type = 'text' id = 'Keywords' name = 'Keywords' size = '110' value = "Fractal, Toriodal Moment,  Induced Transformation Reactions, Ball Lightning, Coherent Matter, " />
    </p><p>Abstract</p><p><textarea name = 'Abstract', rows = '5', cols = 100>Bob Greenyer's Presentation at the 27th Russian Cold Nuclear Transmutation and Ball Lightning conference 2022, walks through repeatable 3rd party experiments that underpin his reasoning for a return to a pressure model of gravity, last popular around 110 years ago.
    
    He explains how this plays into extraordinary MFMP observations of coherent matter effects and apparent interactions, via the fractal toroidal moment, with the spin of dark and ordinary matter, potentially yielding high frequency gravity waves and focussing thereof. Matsumoto documented ‘gravity waves’ in his Pd D experiments in 1990 which may be responsible for the 'gravity decay' of matter he said he observed.
    
    Taken together, this supports claims made in 2018 for destruction of matter and related nuclear fusion technology claimed on behalf of the United States NAVY.</textarea></p><p>Active Link(s): (click on each to open it in another tab)<br/><a href='https://www.youtube.com/watch?v=gux490Oywoo' target = '_blank'>https://www.youtube.com/watch?v=gux490Oywoo</a></p><p>Citations: An 'Enter' key separated list of links (with optional notes) that cite this.</p><p><textarea name = 'Citations', rows = '2', cols = 100></textarea></p><p>Headline: As you or the popular or scientific press might or did describe it.</p><p><input type = 'text' id = 'Headline' name = 'Headline' size = '110' value = "" />
    </p>
    <input type = 'hidden' name = 'doit'  value = 'refresh' readonly />`;

    // this.fetchEventsPage(form).pipe();
    const dummy = [] as ILenrEventDetail[];
    return of(dummy);
  };

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
