import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
  inject
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CrudService } from '../core/crud.service';
import { MfmpBaseComponent } from '../core/mfmp-base-component';

@Component({
  selector: 'mfmp-testpage',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `<ul>
    <li>
      <!--<div><p [innerHTML]="toHTML(test)"></p></div>-->
      <textarea>{{test}}</textarea>
    </li>
    <li>
      <div><p>{{demo | json}}</p></div>
    </li>
    <li>
      <button mat-raised-button (click)="testFusion()">Trigger Test</button>
    </li>
    <li>
      <button mat-raised-button (click)="testDummy()">Trigger Demo</button>
    </li>
  </ul>`,
  styleUrls: ['testpage.component.scss'],
})
export class TestpageShowComponent
  extends MfmpBaseComponent
  implements OnInit, OnDestroy
{
    @Input() test: any;
    @Input() demo: string | null = null;
    @Output() testit: EventEmitter<string> = new EventEmitter();
    @Output() demoit: EventEmitter<string> = new EventEmitter();

    private crudService = inject(CrudService);

  constructor() {
    super();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // this.refresher.unsubscribe();
  }

  testFusion() {
    this.testit.emit('');
  }

  testDummy() {
    this.demoit.emit('');
  }

  toHTML(input: string) : any {
    return new DOMParser().parseFromString(input, "text/html").body.textContent;
}
}
