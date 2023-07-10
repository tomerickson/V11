/**
 * Form data expected by the Select_LENR_Events.php page
 **/
 export interface ILenrEventsRequest {
    s_Year_from: number;
    s_Year_to: number;
    s_Index_from: number;
    s_Index_to: number;
    s_Category: string;
    s_Author: string;
    s_Title: string;
    s_Keywords: string[];
    r_id: number;
    doit: string;
  }