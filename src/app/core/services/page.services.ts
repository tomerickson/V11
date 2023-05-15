/**
 * Page-handling services:
 *
 * Parse html to extract table data
 */

import { Observable } from 'rxjs';
import { IFusionCompositeResults } from '../models/fusion-composite-results.model';
import { KeyValuePair } from '../models/key-value-pair.model';

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

const convertTablesToResultSet = (
  tables: NodeListOf<HTMLTableElement>
): any[] => {
  let results: any[] = [];

  tables.forEach((table: HTMLTableElement) => {
    let tableInfo = Array.prototype.map.call(
      table.querySelectorAll('tr'),
      function (tr) {
        return Array.prototype.map.call(
          tr.querySelectorAll('td'),
          function (td) {
            return td.innerHTML;
          }
        );
      }
    );
    results.push(tableInfo);
  });
  return results;

  //         let headerTagName: 'TH' | 'TD';
  //   let firstDataRowIndex: number;
  //   let dataSectionIndex: number;

  //   if (table.childElementCount === 2) {
  //     headerTagName = 'TH';
  //     firstDataRowIndex = 0;
  //     dataSectionIndex = 1;
  //   } else {
  //     headerTagName = 'TD';
  //     firstDataRowIndex = 1;
  //     dataSectionIndex = 0;
  //   }
  //   const dataSection: HTMLTableSectionElement = table.children[dataSectionIndex] as HTMLTableSectionElement;
  //   const headerRow = table.children[0];
  //   const header: string[] = extractHeadersFromTable(
  //     headerRow as HTMLTableRowElement
  //   );
  //   let rows: [];
  //   rows.push(...header);
  //   for (let index = firstDataRowIndex; index < dataSection.children.length; index++) {
  //     let row: HTMLTableRowElement = dataSection.rows[index];
  //     rows.push(extractContentFromTable(header, row));
  //   }

  //   results.push(header);

  // });
  // return results;
};

/**
 * Get the column headers from the first row of hte
 * @param row
 * @param tagName
 * @returns
 */
const extractHeadersFromTable = (row: HTMLTableRowElement): string[] => {
  let kvp = [];
  for (let cell of row.children) {
    kvp.push(cell.innerHTML);
  }
  return kvp;
};

const extractContentFromTable = (
  header: KeyValuePair[],
  row: HTMLTableRowElement
): any[] => {
  if (header.length === row.children.length) {
    let kvp: KeyValuePair[] = [];
    for (let i = 0; i < header.length; i++) {
      kvp.push({ key: header[i].key, value: row.children[i].innerHTML });
    }
    return kvp;
  } else {
    throw new Error('Table mapping error!');
  }
};
