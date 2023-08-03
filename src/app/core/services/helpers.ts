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
 * Return one captured group from a regex match
 * @param input
 * @param regex
 * @returns
 */
export const getMatchingString = (input: string, regex: string): string => {
  return getMatchingStrings(input, regex)[0];
}

/**
 * Return two or more captured groups from a regex match
 *
 * @param input
 * @param regex
 * @param expected // # of matches expected
 * @returns
 */
export const getMatchingStrings = (input: string, regex: string): string[] => {
  let results: string[] = [];
  let error = '';
  let ok = false;
  let matches: RegExpMatchArray | null = input.match(regex);
  if (matches) {
    for (let i = 1; i < matches.length; i++) {
      results.push(matches[i]);
    }
    ok = true;
  } else {
    error = 'No matches found.';
  }

  if (ok) {
    return results;
  } else {
    const msg = `${error} parseMatchingStrings could not continue.\n
    input: ${input}\n
    regex: ${regex}`;
    console.log(msg);
    throw msg;
  }
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
export const stringifyFormData = (form: FormData): string => {
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
