/**
 * SqlForm is used in fusion and fission pages
 * to pass through and manipulate sql statements
 */
export type SqlForm = {
  coreQuery: string; // Statement without a columns clause or tables clause
  fullQuery: string; // Full sql statement
};
