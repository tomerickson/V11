import { Component } from "@angular/core";
import { Observable, of, Subject } from "rxjs";

@Component({
    template: ``
})

export class MfmpBaseComponent {

    public pageTitle: Subject<string> = new Subject<string>();

}
