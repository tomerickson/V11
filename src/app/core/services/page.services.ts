/**
 * Page-handling services:
 *
 * Parse html to extract table data
 */

export const extractTablesFromPage = (html: string): XPathResult => {
  const parser = new DOMParser();
  const document: Document = parser.parseFromString(html, 'text/html');
  const evaluator = new XPathEvaluator();
  const xPath = `path("//table[@class='table']")`;
  const xPathResult = document.evaluate(xPath, document, null, XPathResult.ANY_TYPE, null);

  return xPathResult;

  // do whatever you want with htmlDoc.getElementsByTagName('a');
};
