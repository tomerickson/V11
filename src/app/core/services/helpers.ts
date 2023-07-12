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
  const props = Object.getOwnPropertyNames(obj)

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
}
