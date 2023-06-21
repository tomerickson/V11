/**
 * Page-handling services:
 *
 * Parse html to extract table data
 */
export const extractTablesFromPage = (html: string): any[] => {
  let result = [];
  const parser = new DOMParser();
  const document: Document = parser.parseFromString(html, 'text/html');
  const tables: NodeListOf<HTMLTableElement> =
    document.querySelectorAll('table.results');
  if (validateTables(3, tables)) {
    result = convertTablesToResultSet(tables);
  }
  return result; // const xPathResult = document.evaluate(xPath, document, null, XPathResult.ANY_TYPE, null);
};
  /**
   * Convert spin choices to a string for postback
  
   * @param bosons 
   * @param fermions 
   * @returns 
   * @remarks
   * If both choices are false convert them to true
   */
  export const formatSpinChoices = (bosons: boolean, fermions: boolean): string => {
    return bosons && fermions ? 'bf' : bosons ? 'b' : fermions ? 'f' : 'bf';
  };
/**
 * Expect the right number of tables,
 * with each table containing a tbody and optional thead
 *
 * @param numberOfTablesExpected
 * @param tables
 * @returns
 */
const validateTables = (
  numberOfTablesExpected: number,
  tables: NodeListOf<HTMLTableElement>
): boolean => {
  let valid: boolean = tables.length === numberOfTablesExpected;
  if (valid) {
    tables.forEach((table) => {
      valid =
        valid && table.childElementCount > 0 && table.childElementCount < 3;
      valid = valid && table.lastElementChild?.tagName == 'TBODY';
    });
  }
  return valid;
};

/**
 * Return an array of arrays corresponding to the
 * tables on the page.
 * @param tables
 * @returns
 */
const convertTablesToResultSet = (
  tables: NodeListOf<HTMLTableElement>
): any[] => {
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
