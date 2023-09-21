import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllResultsFaceComponent } from './all-results-face.component';
import { Store } from '@ngrx/store';
import * as state from '../state/all-results';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { IAllResultsDataModel } from '../core/models/all-results-data.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { PageNavigator } from '../shared/models/page-navigator';
import { AllResultsService } from './all-results.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'mfmp-all-results-head',
  standalone: true,
  imports: [CommonModule, AllResultsFaceComponent],
  template: `
    <mfmp-all-results-face
      [resultList]="page | async"
      [pageSize]="pageSize | async"
      [pageSizes]="pageSizes"
      [ready]="ready | async"
      [error]="error | async"
      [rows]="rows | async"
      (opener)="openLink($event)"
      (sorter)="sortData($event)"></mfmp-all-results-face>
  `,
  styleUrls: []
})
export class AllResultsHeadComponent implements OnInit {
  store = inject(Store);
  headerService = inject(HeaderProviderService);
  featureService = inject(AllResultsService);
  results: Observable<IAllResultsDataModel[]> = of([]);
  page!: Observable<IAllResultsDataModel[]>
  rows!: Observable<number>;
  ready!: Observable<boolean>;
  error!: Observable<any>;
  pageIndex: number = 0;
  pageSize = new BehaviorSubject<number>(10);
  pageSizes = [5, 10, 15, 25];
  pageEvent: PageEvent = new PageEvent();
  pageManager: PageNavigator = new PageNavigator();

  ngOnInit(): void {
    this.page = of([] as IAllResultsDataModel[]);
    this.pageManager.page = 1;
    this.pageManager.size = 10;
    this.pageManager.sizes = this.pageSizes;
    this.headerService.buildPageHeader('all-results');
    this.results = this.store.select(state.feature.selectResults);
    this.page = this.store.select(state.feature.selectPage);
    this.rows = this.store.select(state.feature.selectRows);
    this.ready = this.store.select(state.feature.selectReady);
    this.error = this.store.select(state.feature.selectError);
    this.store.dispatch(
      state.actions.loadResults({ query: 'TODO: remove this' })
    );
  }

  switchPage(e: any) {
    const navigator = e as PageNavigator;
    console.log(`head: navigator: ${navigator}`);
    this.pageSize.next(navigator.size);
    this.store.dispatch(state.actions.setPage({ payload: navigator }));
  }

  openLink = (link: string) => {
    this.featureService.openLink(link);
  };

  sortData = (sort: Sort) => {
    this.store.dispatch(state.actions.sort({payload: sort}))

  }
}
