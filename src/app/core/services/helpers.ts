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
