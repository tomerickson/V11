import { LenrEventDetail } from "../models/lenr-event-detail.model";

export const buildFormData = (input: any): FormData => {
    return input as FormData;
}

export const parseEventPage = (input: string): LenrEventDetail[] => {
    const result: LenrEventDetail[] = [];
    return result;
}

export const getFormData = (object: any): FormData => {
    const formData = new FormData();
    Object.keys(object).forEach(key => {
      if (typeof object[key] !== 'object') formData.append(key, object[key])
      else formData.append(key, JSON.stringify(object[key]))
    })
    return formData;
}

export const extractDataFromResponse = (body: string) => {
    
}