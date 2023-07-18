import { KeyValuePair } from '../models/key-value-pair.model';

/**
 * Compare array contents to expected model
 * @param head the first row of a data stream representing the column names
 * @param model an array of expected column names
 * @returns
 */
export const modelMatches = (head: string[], model: string[]): boolean => {
  let matches = 0;
  for (let i = 0; i < model.length; i++) {
    if (model[i] === head[i]) {
      matches++;
    }
  }
  return matches === model.length;
};

/**
 * Wrap a word in apostrophes
 * @param word
 * @returns
 */
export const apostrophise = (word: string): string => {
  return surround(word, "'");
};

/**
 * Wrap a word in a delimiter
 * @param word
 * @param delimiter
 * @returns
 */
export const surround = (word: string, delimiter: string): string => {
  return `${delimiter}${word}${delimiter}`;
};

/**
 * Convert an enumerable object to FormData
 * @param object
 * @returns
 */
export const getFormData = (object: any): FormData => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => {
    if (!key.startsWith('_')) {
      if (typeof object[key] !== 'object') formData.append(key, object[key]);
      else formData.append(key, JSON.stringify(object[key]));
    }
  });
  return formData;
};

/**
 *
 * @param form
 * @returns
 */
const stringifyFormData = (form: FormData): string => {
  const arr = Array.from(form.entries());
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const key: string = arr[i][0];
    let value: FormDataEntryValue = arr[i][1];
    if (value === 'null') value = '';
    const kvp = `${key}=${value}`;
    result.push(kvp);
  }
  return result.join('&').toString();
};

export const getFormDataString = (object: any): string => {
  const formData = getFormData(object);
  const result = [];

  const arr = Array.from(formData.entries());
  for (let i = 0; i < arr.length; i++) {
    const key: string = arr[i][0];
    let value: FormDataEntryValue = arr[i][1];
    if (value === 'null') value = '';
    const kvp = `${key}=${value}`;
    result.push(kvp);
  }
  return result.join('&').toString();
};

/**
 * Convert an object to FormData
 * (ignore property names starting with _
 *  they're assumed to be private)
 * @param obj
 * @returns FormData
 */
export const asFormData = (obj: any): FormData => {
  type T = keyof typeof obj;
  const formData: FormData = new FormData();
  const props = Object.getOwnPropertyNames(obj);

  for (const op of props) {
    const prop = op as T;
    if (true) {
      let value: any = obj[prop];
      let ok = true;
      if (String(prop).startsWith('_')) ok = false; // exclude private properties
      if (ok) {
        if (value == undefined) {
          value = '';
        }
        formData.append(String(prop), value);
      }
    }
  }
  return formData;
};

/**
 * Convert kvp array to FormData object
 * for consumption by http.post
 *
 * @param kvp
 * @returns
 */
const buildFormData = (kvp: KeyValuePair[]): FormData => {
  let formData: FormData = new FormData();
  for (let pair of kvp) {
    formData.append(pair.key, pair.value);
  }
  return formData;
};

export const KvpsToFormData = (kvp: KeyValuePair[]): string => {
  return stringifyFormData(buildFormData(kvp));
};

export const FormDataToQueryString = (form: FormData): string => {
  const parameters = [];
  for (var pair of form.entries()) {
    parameters.push(
      encodeURIComponent(pair[0]) + '=' + encodeURIComponent(pair[1].toString())
    );
  }
  return parameters.join('&');
};
