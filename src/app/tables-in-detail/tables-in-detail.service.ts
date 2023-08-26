import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from '../core/services/crud.service';

@Injectable()
export class TablesInDetailService {
  crud = inject(CrudService);
  readonly page = 'TablesInDetail.php';

  htmlToDocument(html: string): Document {
    const parser = new DOMParser();
    let doc = parser.parseFromString(html, 'text/html');
    const body: string = doc.activeElement?.outerHTML ?? '';

    let dom = document.implementation.createHTMLDocument();
    dom.documentElement.innerHTML = '<head></head>' + body;
    return dom;
  }

  getTablesPage(): Observable<string> {
    return this.crud.getPage(this.page);
  }

  /**
   * Strip out elements between the <body> tag and the third <p> tag
   */
  parseTablesPage(html: string): string {
    const parser = new DOMParser();
    const body = parser
      .parseFromString(html, 'text/html')
      .querySelector('body') as HTMLBodyElement;

    let paragraphs = 0;
    while (true) {
      const element = body.children[0];
      if (element.tagName === 'P') paragraphs++;
      if (paragraphs === 3) break;
      body.removeChild(element);
    }

    let result = '';
    for (let i = 0; i < body.children.length; i++) {
      result += body.children[i].outerHTML;
    }

    return result;
  }
}
