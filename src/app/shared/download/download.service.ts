import { Injectable } from '@angular/core';
import { Downloadable } from 'src/app/core/models/downloadable.model';

Injectable();
export class DownloadService {
  private arrayToCsv = (data: any[]): string => {
    return data
      .map(
        (row: any) =>
          row
            .map(String) // convert every value to String
            .map((v: string) => v.replaceAll('"', '""')) // escape double colons
            .map((v: string) => `"${v}"`) // quote it
            .join(',') // comma-separated
      )
      .join('\r\n'); // rows starting on new lines
  };

  private arrayToTsv = (data: any[]) => {
    return data.map((row: any) => row.map(String).join('\t')).join('\r\n');
  };

  private arrayToText = (data: any[]) => {
    return data.join('\r\n');
  };

  private arrayToJson = (data: any[]): Object[] => {
    const props: string[] = data.shift();
    let output = [];
    for (var i = 0; i < data.length; i++) {
      const obj: { [index: string]: any } = {};
      for (var j = 0; j < props.length; j++) {
        obj[props[j]] = data[i][j];
      }
      output.push(obj);
    }
    return output;
  };

  private arrayToHtml = (data: any[], fileName: string): string => {
    const footer: string = '</table></body></html>';
    let columns = `${this.styleColumns(data)}`;
    let index = 0;
    let html: string = `<!doctype html><html><head>
      <title>${fileName}</title>
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
      <style>
      th, td {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 300;
      }
      th {font-weight: bold;}
      .header {
        text-align: center;
      }
      ${columns}
      </style>
      </head><body>
      <table>
      <caption>${fileName}</caption>`;

    // html += `<tr><th class="header" colspan=${data[0].length}>${fileName}</th></tr>`

    data.map((row) => {
      const tag = index === 0 ? 'th' : 'td';
      html += this.buildTableRow(tag, row);
      index++;
    });
    html += footer;
    return html;
  };

  private buildTableRow = (tag: string, row: any) => {
    let tr = `<tr>`;
    for (let cell of row) {
      tr += this.buildTableCell(tag, cell);
    }
    tr += '</tr>';
    return tr;
  };

  private buildTableCell = (tag: string, cell: any): string => {
    // const value = cell.replace(/(?:![,]*)/g, '\\1');
    const td = `<${tag}>${encodeURIComponent(cell)}</${tag}>`;
    return td;
  };

  private styleColumns = (data: any[]): string => {
    let cols = '';
    if (data.length > 0) {
      const row = data[1];
      for (let col = 0; col < row.length; col++) {
        let value = row[col];
        if (!isNaN(value)) {
        cols += `td:nth-child(${col+1}) {
          text-align: right
        }
        `;
        }
      }
    }
    return cols;
  };

  /** Download contents as a file
   * Source: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
   */
  downloadBlob = (
    downloadType: Downloadable,
    data: any[],
    fileName: string
  ) => {
    // Create a blob
    let blob: Blob;

    if (downloadType) {
      switch (downloadType.key) {
        case 'csv': // csv
          blob = new Blob([this.arrayToCsv(data)], { type: downloadType.type });
          break;
        case 'tab': // tsv
          blob = new Blob([this.arrayToTsv(data)], { type: downloadType.type });
          break;
        case 'txt': // text
          blob = new Blob([this.arrayToText(data)], {
            type: downloadType.type
          });
          break;
        case 'prettyjson': // pretty json
          blob = new Blob(
            [JSON.stringify(this.arrayToJson(data), null, '\t')],
            { type: downloadType.type }
          );
          break;
        case 'json': // json
          blob = new Blob([JSON.stringify(this.arrayToJson(data))], {
            type: downloadType.type
          });
          break;
        case 'html': // html
          blob = new Blob([this.arrayToHtml(data, fileName)], {
            type: downloadType.type
          });
          break;
        default:
          throw `type ${downloadType} is not a valid downloadable type.`;
      }

      const pom = document.createElement('a');
      const url = URL.createObjectURL(blob);
      pom.href = url;
      pom.download = fileName;
      pom.click();
      URL.revokeObjectURL(url);
    }
  };
}
