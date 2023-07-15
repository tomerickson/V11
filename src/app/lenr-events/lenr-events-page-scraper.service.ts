import { ILenrEventDetail } from '../core/models/lenr-event-detail.model';
import { ILenrEventsLookup } from '../core/models/lenr-events-lookup.model';
/**
 * Logic for scraping the LENR_Events page
 * */

export class LenrEventsPageScraperService {
  dom!: Document;

  stub: ILenrEventDetail = {} as ILenrEventDetail;

  constructor(private html: string) {
    this.dom = new DOMParser().parseFromString(html, 'text/html');
  }

  private parseCitations(citations: string): string[] | null {
    let result: string[] = citations.split(/\r?\n|\r|\n/g);
    result = result.filter(each => each.trim().length > 0);
    return (result.length > 0) ? result : null;


  }
  private getInputValue = (inputs: HTMLInputElement[], elementId: string) => {
    const input = inputs.find((elm) => elm.id === elementId);
    if (input) {
      return input.value;
    } else {
      throw `Incorrect input element Id: ${elementId}`;
    }
  };

  get categories(): string[] {
    let categories: string[] = [];
    let selector: HTMLSelectElement | undefined = Array.from(
      this.dom.documentElement.getElementsByTagName('select')
    ).find((elm: HTMLSelectElement) => elm.id === 's_Category');
    if (selector) {
      for (let option of selector.options) {
        let value: string = option.value;
        categories.push(value);
      }
    }
    return categories;
  }

  get eventCount(): number {
    let result = 0;
    let paragraph = Array.from(
      this.dom.documentElement.getElementsByTagName('p')
    ).find((p) => p.textContent?.includes('Exploring the new'))?.textContent;

    if (paragraph) {
      const entriesRex = /Exploring the new .*?([0-9]+) entries/i;
      const scan = entriesRex.exec(paragraph);
      result = scan ? +scan[1] : 0;
      console.log('eventCount', result);
    }
    return result;
  }

  get maxId(): number {
    let result = 0;
    let element: HTMLInputElement | undefined = Array.from(
      this.dom.documentElement.getElementsByTagName('input')
    ).find((elm: HTMLInputElement) => elm.id === 's_Index_to');
    result = element ? +element.value : 0;
    return result;
  }

  /**
   * Extract an EventDetail from the page
   */
  get detail(): ILenrEventDetail {
    const inputs = Array.from(this.dom.getElementsByTagName('input'));
    let result = {} as ILenrEventDetail;

    result.category = this.getInputValue(inputs, 'Category');
    result.year = +this.getInputValue(inputs, 'Year');
    result.author = this.getInputValue(inputs, 'Author');
    result.title = this.getInputValue(inputs, 'Title');
    result.journal = this.getInputValue(inputs, 'Journal_Title');
    result.editor = this.getInputValue(inputs, 'Editor');
    result.publisher = this.getInputValue(inputs, 'Publisher');
    result.city = this.getInputValue(inputs, 'City');
    result.date = this.getInputValue(inputs, 'Date');
    result.keywords = this.getInputValue(inputs, 'Keywords').split(',');
    result.headline = this.getInputValue(inputs, 'Headline');
    result.category = this.getInputValue(inputs, 'Category');

    const textareas: HTMLTextAreaElement[] = Array.from(
      this.dom.getElementsByTagName('textarea')
    );
    for (let textarea of textareas) {
      const name = textarea.name.toLowerCase();
      switch (name) {
        case 'abstract':
          result.abstract = textarea.innerText;
          break;
        case 'comment':
          result.comment = textarea.innerText;
          break;
        case 'citations':
          const citations = this.parseCitations(textarea.innerText);
          if (citations) result.citations = citations;
          break;
      }
    }

    const hyperLinks: HTMLAnchorElement[] = Array.from(
      this.dom.getElementsByTagName('a')
    );
    result.hyperlinks = hyperLinks.map((link) => link.href);

    return result;
  }

  get events(): ILenrEventsLookup[] {
    let result = new Array<ILenrEventsLookup>();
    let selector: HTMLSelectElement | undefined = this.dom.getElementById(
      'r_id'
    ) as HTMLSelectElement;

    if (selector) {
      for (let i = 0; i < selector.options.length; i++) {
        const option: HTMLOptionElement = selector.options[i];
        let value: number = +option.value;
        const split = option.innerText.split(':');
        const obj = {} as ILenrEventsLookup;
        obj.year = +split[0];
        obj.category = split[1];
        obj.author = split[2];
        obj.title = split[3];
        obj.id = value;
        result.push(obj);
      }
    }
    return result;
  }
}
