/**
 * Form data expected by the Select_LENR_Events.php page
 **/
export interface ILenrEventsRequest {
  s_Year_from: string;
  s_Year_to: string;
  s_Index_from: string;
  s_Index_to: string;
  s_Category: string;
  s_Author: string;
  s_Title: string;
  s_Keywords: string[];
  Category: string;
  Year: string;
  r_id_copy: string;
  Author: string;
  Title: string;
  Journal_Title: string;
  Editor: string;
  Publisher: string;
  City: string;
  Date: string;
  Comment: string;
  Keywords: string;
  Abstract: string;
  Citations: string;
  Headline: string;
  doit: string;
}

export class LenrEventsRequest implements ILenrEventsRequest {
  private _year = new Date().getFullYear();
  s_Year_from: string;
  s_Year_to: string;
  s_Index_from!: string;
  s_Index_to!: string;
  s_Category = '';
  s_Author = '';
  s_Title!: string;
  s_Keywords!: string[];
  Category!: string;
  Year!: string;
  r_id_copy!: string;
  Author!: string;
  Title!: string;
  Journal_Title!: string;
  Editor!: string;
  Publisher!: string;
  City!: string;
  Date!: string;
  Comment!: string;
  Keywords!: string;
  Abstract!: string;
  Citations!: string;
  Headline!: string;
  r_id!: number | null;
  doit!: string;

  constructor() {
    this.s_Year_from = this._year.toString();
    this.s_Year_to = this._year.toString();
  }
}
