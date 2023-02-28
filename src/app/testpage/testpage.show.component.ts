import { CommonModule, NgFor} from '@angular/common';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
  inject
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { IElementDataModel } from '../core/element.data.model';
import { MfmpBaseComponent } from '../core/mfmp-base-component';
import {} from '.@angular/material/'
@Component({
  imports: [CommonModule, MatButtonModule, NgFor],
  selector: 'mfmp-testpage',
  standalone: true,

  template: `<ul>
      <li>
        <!--<div><p [innerHTML]="toHTML(test)"></p></div>-->
        <textarea>{{ test }}</textarea>
      </li>
      <li>
        <div>
          <p>{{ demo | json }}</p>
        </div>
      </li>
    </ul>
    <ul>
      
      <li *ngFor="let xx of elements">
        <p>{{ xx.EName }}</p>
      </li>
    </ul>
    <ul>
      <li>
        <button mat-raised-button (click)="loadElements()">
          Load Elements
        </button>
      </li>
      <li>
        <button mat-raised-button (click)="testFusion()">Trigger Test</button>
      </li>
      <li>
        <button mat-raised-button (click)="testDummy()">Trigger Demo</button>
      </li>
    </ul>`,
  styleUrls: ['testpage.component.scss']
})
export class TestpageShowComponent
  extends MfmpBaseComponent
  implements OnInit, OnDestroy
{
  @Input() test: any;
  @Input() demo: string | null;
  @Input() elements: IElementDataModel[] | null;
  @Output() testit: EventEmitter<string> = new EventEmitter();
  @Output() demoit: EventEmitter<string> = new EventEmitter();
  @Output() getElements: EventEmitter<string> = new EventEmitter();

  constructor() {
    super();
    this.demo = null;
    this.elements = [];
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // this.refresher.unsubscribe();
  }

  loadElements() {
    this.getElements.emit('');
  }

  testFusion() {
    this.testit.emit('');
  }

  testDummy() {
    this.demoit.emit('');
  }

  toHTML(input: string): any {
    return new DOMParser().parseFromString(input, 'text/html').body.textContent;
  }
}
