/**
 * Page-handling services:
 * 
 * Parse html to extract table data
 */
export const extractTablesFromPage = (html: string): [[], [],[]] => {
    const parser = new DOMParser();
const document = parser.parseFromString(html, 'text/html');
const evaluator = new XPathEvaluator(); 
const xPath = `path("//table[@class='table']")`;
const result: XPathResult = evaluator.evaluate(xPath, document, null);



// do whatever you want with htmlDoc.getElementsByTagName('a');
}