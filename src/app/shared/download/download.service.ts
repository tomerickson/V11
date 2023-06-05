import { Injectable } from '@angular/core';
import {
  Downloadable} from 'src/app/core/models/downloadable.model';

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
    for (var i = 0; i< data.length; i++) {
      const obj: {[index: string]:any} = {}
      for (var j=0; j< props.length; j++) {
          obj[props[j]] = data[i][j];
      }
      output.push(obj);
  }
    return output;
  }

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
          blob = new Blob([this.arrayToText(data)], { type: downloadType.type });
          break;
        case 'prettyjson': // pretty json
          blob = new Blob([JSON.stringify(this.arrayToJson(data), null, '\t')], { type: downloadType.type });
          break;
          case 'json': // json
          blob = new Blob([JSON.stringify(this.arrayToJson(data))], { type: downloadType.type });
          break;
        case 'txt': // html
          blob = new Blob([this.arrayToText(data)], { type: downloadType.type });
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
