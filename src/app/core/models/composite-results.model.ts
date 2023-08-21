import { IElementResultsModel } from './element-results.model';
import { INuclideResultsModel } from './nuclide-results.model';

/**
 * Base class for reaction results incoming from the various
 * reaction pages: CascadesAll, Fission, Fusion, TwoUp, etc.
 *
 */
export abstract class CompositeResultsModel {
  reactionResults: any[] = [];
  nuclideResults: any[] = [];
  elementResults: any[] = [];
  radioNuclideResults: any[] = [];
  get reactionRows() {
    return this.reactionResults.length - 1;
  }
  get nuclideRows() {
    return this.nuclideResults.length - 1;
  }
  get elementRows() {
    return this.elementResults.length - 1;
  }
  get radioNuclideRows() {
    return this.radioNuclideResults.length - 1;
  }

  ok!: boolean;
  errors: string[] = [];

  elementsTemplate = ['Z', 'E', 'EName'];
  nuclidesTemplate = ['id', 'A', 'Z'];
  radioNuclidesTemplate = ['id', 'A', 'E', 'Z'];
  /**
   * Automatically parse the incoming page (assumed to contain
   * multiple sets of results) and convert them to CompositeResultModel
   *
   * @param html // Incoming html
   * @param reactionTemplate
   *
   *   array of strings that identify the first columns of the reaction table.
   *   The format of the elements results and nuclides results are fixed, but
   *   the reaction table structure varies by reaction type
   *
   * @param numberOfTablesExpected - optional
   * */
  constructor(
    private html: string,
    private reactionTemplate: string[],
    private numberOfTablesExpected: number = 3
  ) {
    this.parseReactionResults();
  }

  /**
   * Compare array contents to expected model
   * @param head the first row of a data stream representing the column names
   * @param model an array of expected column names
   * @returns
   */
  modelMatches = (head: string[], template: string[]): boolean => {
    let matches = 0;
    for (let i = 0; i < template.length; i++) {
      if (template[i] === head[i]) {
        matches++;
      }
    }
    return matches === template.length;
  };
  /**
   * Match up the first fields of the incoming
   * header to the expected columns to determine the
   * result type, and stores the table body in
   * the matched property
   *
   * @param thead
   * @param tbody
   * @returns
   */
  parseTableContent = (thead: string[], tbody: any[]) => {
    if (this.modelMatches(thead, this.reactionTemplate)) {
      this.reactionResults = tbody;
    } else if (this.modelMatches(thead, this.nuclidesTemplate)) {
      this.nuclideResults = tbody;
    } else if (this.modelMatches(thead, this.elementsTemplate)) {
      this.elementResults = tbody;
    } else if (this.modelMatches(thead, this.radioNuclidesTemplate)) {
      this.radioNuclideResults = tbody;
    } else {
      const msg = `table with this thead: "${thead.join(
        ','
      )}" couldn't be matched to any template.`;
      this.errors.push(msg);
    }
  };

  /**
   *
   * Extract the results tables from the page and convert them
   * into DTOs, then bundle them into a CompositeResultsModel object.
   *
   * @param html
   * @returns
   */
  parseReactionResults = () => {
    const data = this.extractTablesFromPage();
    console.log('reactionTemplate', this.reactionTemplate);
    console.log('nuclidesTemplate', this.nuclidesTemplate);
    console.log('elementsTemplate', this.elementsTemplate);
    console.log('radioNuclidesTemplate', this.radioNuclidesTemplate);
    for (let i = 0; i < data.length; i++) {
      if (data.length > 0) {
        const table: any[] = data[i];
        const thead: any[] = table[0];
        const tbody: any[] = table;
        this.parseTableContent(thead, tbody);
      }
    }

    let tablesFound = 0;
    tablesFound += this.reactionResults.length > 0 ? 1 : 0;
    tablesFound += this.nuclideResults.length > 0 ? 1 : 0;
    tablesFound += this.elementResults.length > 0 ? 1 : 0;
    tablesFound += this.radioNuclideResults.length > 0 ? 1 : 0;
    this.ok = tablesFound >= this.numberOfTablesExpected;

    if (!this.ok) {
      if (this.reactionResults.length == 0) {
        this.errors.push('Reaction table is missing');
      }
      if (this.nuclideResults.length == 0) {
        this.errors.push('Nuclides table is missing');
      }
      if (this.elementResults.length == 0) {
        this.errors.push('Elements table is missing');
      }
    }
  };

  /**
   * Return an array of arrays that map the
   * tables on the page.
   * @param tables
   * @returns
   */
  convertTablesToResultSet = (tables: NodeListOf<HTMLTableElement>): any[] => {
    let results: any[] = [];

    tables.forEach((table: HTMLTableElement) => {
      let tableInfo = Array.prototype.map.call(
        table.querySelectorAll('tr'),
        (tr) =>
          Array.prototype.map.call(
            tr.querySelectorAll('td'),
            (td) => td.innerHTML
          )
      );
      results.push(tableInfo);
    });
    return results;
  };

  /**
   * Parse html to extract table data
   */
  extractTablesFromPage = () => {
    let result = [];
    const parser = new DOMParser();
    const document: Document = parser.parseFromString(this.html, 'text/html');
    const tables: NodeListOf<HTMLTableElement> =
      document.querySelectorAll('table.results');
    if (this.validateTables(tables)) {
      result = this.convertTablesToResultSet(tables);
    }
    return result; // const xPathResult = document.evaluate(xPath, document, null, XPathResult.ANY_TYPE, null);
  };

  /**
   * Expect the right number of tables,
   * with each table containing a tbody and optional thead
   *
   * @param numberOfTablesExpected
   * @param tables
   * @returns
   */
  validateTables = (tables: NodeListOf<HTMLTableElement>): boolean => {
    let valid: boolean = tables.length >= this.numberOfTablesExpected;
    if (valid) {
      tables.forEach((table) => {
        valid =
          valid && table.childElementCount > 0 && table.childElementCount < 3;
        valid = valid && table.lastElementChild?.tagName == 'TBODY';
      });
    }
    return valid;
  };
}
