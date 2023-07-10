import { ILenrEventsLookup } from "./lenr-events-lookup.model";
/**
 * Logic for scraping the LENR_Events page
 * */
export class LenrEventsPageModel {
  document: Document;

  constructor(html: string) {
    this.document = new DOMParser().parseFromString(html, 'text/html');
  }

 get categories(): string[] {
    let categories: string[] = [];
    let selector = document.getElementById('r_id') as HTMLSelectElement
    for (let option of selector.options) {
        categories.push(option.innerText);
    }
    return categories;
  };

  get entries(): number {
    let result = 0;
    let paragraph = Array.from(document.querySelectorAll('p')).find(
      (p) => p.textContent?.includes('Exploring the new')
    )?.textContent;

    if (paragraph) {
      const entriesRex = /Exploring the new .*?([0-9]+) entries/i;
      const scan = entriesRex.exec(paragraph);
      result = scan ? +scan[1] : 0;
    }
    return result;
  };

  get maxId(): number {
    let result = 0;
    for (const a of document.querySelectorAll('p')) {
      if (a.textContent?.includes('(max')) {
        console.log(a.textContent);
        const maxIdRex = /^.*?([0-9]+).*$/im;
        let matches = a.textContent.match(maxIdRex);
        result = matches ? +matches[matches.length - 1] : -1;
        console.log('maxId', result);
        break;
      }
    }
    return result;
  };

  get events(): ILenrEventsLookup[] {
    let result = new Array<ILenrEventsLookup>();
    let selector = document.getElementById('r_id') as HTMLSelectElement
    for (let option of selector.options) {
            let value: number = +option.value;
            const split = option.innerText.split(':');
            const obj = {} as ILenrEventsLookup;
            obj.year = +split[0];
            obj.category = split[1];
            obj.author = split[2];
            obj.title= split[3];
            obj.id = value;
            result.push(obj);
    }  
    return result;    
  }
}
