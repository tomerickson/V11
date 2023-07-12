import { ILenrEventsLookup } from '../core/models/lenr-events-lookup.model';
/**
 * Logic for scraping the LENR_Events page
 * */
export class LenrEventsPageScraperService {
  dom!: Document;
  constructor(private html: string) {
    this.dom = new DOMParser().parseFromString(html, 'text/html');
  }

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

  get events(): ILenrEventsLookup[] {
    let result = new Array<ILenrEventsLookup>();
    let selector: HTMLSelectElement | undefined = 
      this.dom.getElementById('r_id') as HTMLSelectElement;
  
    if (selector) {
      for (let i = 0; i < selector.options.length; i++) {
        const option: HTMLOptionElement  = selector.options[i];
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
