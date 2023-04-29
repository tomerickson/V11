import { CommonModule, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, EventEmitter, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { from, Observable, of, tap } from 'rxjs';
import { CrudService } from '../core/crud.service';
import { IElementDataModel } from '../core/element.data.model';
import { TestpageShowComponent } from './testpage.show.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule, TestpageShowComponent, NgIf],
  template: `<mfmp-testpage
    [test]="this.testResults | async"
    [demo]="this.dummyResults | async"
    [elements]="this.elements | async"
    (testit)="testFusion()"
    (demoit)="testDummy()"
    (getElements)="loadElements()"
  ></mfmp-testpage>`
})
export class TestpagePipeComponent

  implements OnInit, OnDestroy
{
  private crudService = inject(CrudService)
  testResults: Observable<string> = of();
  dummyResults: Observable<string> = of();
  elements: Observable<IElementDataModel[] | null> = from([]);

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // this.refresher.unsubscribe();
  }

  loadElements() {
    console.log('loading elements');
    this.elements = this.crudService.getElements();
  }

  reloadFusion() {
    this.testResults = this.crudService.getFusionResults();
    // .pipe(tap(res => console.log(res)));
  }

  reloadDemo() {
    this.crudService.getDummyResults().pipe(
      tap((res) => console.log(res)),
      (res) => (this.dummyResults = res)
    );
  }

  testFusion(): void {
    console.log('testing');
    this.reloadFusion();
  }

  testDummy(): void {
    console.log('demo');
    this.reloadDemo();
  }

  showIt(): void {
    console.log('testResults:', this.testResults);
  }
}
