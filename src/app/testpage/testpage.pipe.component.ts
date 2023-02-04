import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  EventEmitter
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { from, Observable, of, tap } from 'rxjs';
import { CrudService } from '../core/crud.service';
import { MfmpBaseComponent } from '../core/mfmp-base-component';
import { TestpageShowComponent } from './testpage.show.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule, TestpageShowComponent],
  template: `<mfmp-testpage
  [test]="this.testResults | async"
  [demo]="this.dummyResults | async"
  (testit)="testFusion()"
  (demoit)="testDummy()"></mfmp-testpage>`
})
export class TestpagePipeComponent
  extends MfmpBaseComponent
  implements OnInit, OnDestroy
{
  testResults: Observable<string> = of();
  dummyResults: Observable<string> = of();

  constructor(private crudService: CrudService) {
    super();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // this.refresher.unsubscribe();
  }

  reloadFusion() {
    this.testResults = this.crudService
      .getFusionResults();
      // .pipe(tap(res => console.log(res)));
  }

  reloadDemo() {
    this.crudService.getDummyResults()
    .pipe(tap(res => console.log(res)),
    res => this.dummyResults = res);
  }

  testFusion(): void {
    console.log('testing');
    this.reloadFusion();
  }

  testDummy(): void {
    console.log('demo')
    this.reloadDemo();
  }

  showIt(): void {
    console.log('testResults:', this.testResults);
  }
}
