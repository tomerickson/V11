import { Component } from "@angular/core";
import { Observable, of, Subject } from "rxjs";

@Component({
    template: ``
})

export class MfmpBaseComponent {

    protected _pageTitle: string = '';
    protected _pageDescription: string = '';
    get pageTitle(): string { return this._pageTitle };
    set pageTitle(value: string) { this._pageTitle = value; }
    get pageDescription(): string { return this._pageDescription; }
    set pageDescription(value: string) { this._pageDescription = value; }
}
