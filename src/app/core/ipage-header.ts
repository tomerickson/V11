import { Observable } from "rxjs";

export interface IPageHeader {
  pageName: string;
  pageTitle: string;
  pageCredits: string;
  pageDescription: string;
}
/**
 * Sample implementation
 */
/* import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

export abstract class MfmpBaseComponent {
  private _pageTitle!: Observable<string>;
  private _pageCredits!: Observable<string>;
  private _pageDescription!: Observable<string>;

  get pageTitle(): Observable<string> {
    return this._pageTitle;
  }
  set pageTitle(value: Observable<string>) {
    this._pageTitle = value;
  }
  get pageCredits() {
    return this._pageCredits;
  }
  set pageCredits(value: Observable<string>) {
    this._pageCredits = value;
  }
  get pageDescription() {
    return this._pageDescription;
  }
  set pageDescription(value: Observable<string>) {
    this._pageDescription = value;
  }
  store = inject(Store);
} */
