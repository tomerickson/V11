export type DownloadTypeEnum =
  | 'text/csv'
  | 'text/tab-separated-values'
  | 'text/html'
  | 'application/json';

export interface Downloadable {
  id: number;
  key: string;
  name: string;
  extension: string;
  type: DownloadTypeEnum;
}

export const downloadOptions: Downloadable[] = [
  { id: 0, key: 'csv', name: 'Comma-delimited', extension: '.csv', type: 'text/csv' },
  {
    id: 1,
    key: 'tab',
    name: 'Tab-delimited',
    extension: '.tsv',
    type: 'text/tab-separated-values'
  },
  { id: 2, key: 'txt', name: 'Text', extension: '.txt', type: 'text/html' },
  { id: 3, key: 'prettyjson', name: 'Pretty JSON', extension: '.json', type: 'application/json' },
  {
    id: 4,
    key: 'json',
    name: 'Compressed JSON',
    extension: '.json',
    type: 'application/json'
  },
  { id: 5, key: 'txt', name: 'any', extension: '.?', type: 'text/html' }
];
