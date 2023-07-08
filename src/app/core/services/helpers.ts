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
    if (typeof object[key] !== 'object') formData.append(key, object[key]);
    else formData.append(key, JSON.stringify(object[key]));
  });
  return formData;
};