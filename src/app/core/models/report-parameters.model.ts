import { ReactionTypeEnum } from './reaction-type-enum.model';

export class ReportParameters {
  url: string;
  reactionType: ReactionTypeEnum;
  query: string;
  tables: number;

  constructor(
    url: string,
    type: ReactionTypeEnum,
    query: string,
    tables: number
  ) {
    this.url = url;
    this.reactionType = type;
    this.query = query;
    this.tables = tables;
  }
}
