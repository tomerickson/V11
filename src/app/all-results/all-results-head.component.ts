import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllResultsFaceComponent } from './all-results-face.component';
import { Store } from '@ngrx/store';
import * as feature from '../state/all-results';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { IAllResultsDataModel } from '../core/models/all-results-data.model';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'mfmp-all-results-head',
  standalone: true,
  imports: [CommonModule, AllResultsFaceComponent],
  template: `<mfmp-all-results-face
  [resultList]="results | async"
  (pager)="switchPage($event)"></mfmp-all-results-face>`,
  styleUrls: []
})
export class AllResultsHeadComponent implements OnInit {

  store = inject(Store);
  headerService = inject(HeaderProviderService);
  results!: Observable<IAllResultsDataModel[]> | undefined;
  pageSize = 10;

  ngOnInit(): void {
        this.headerService.buildPageHeader('all-results');
        this.results = this.store.select(feature.feature.selectPage)
        this.store.dispatch(feature.actions.loadResults({query: 'TODO: remove this'}));
        this.store.dispatch(feature.actions.loadPage({pageNumber: 1, pageSize: this.pageSize}));
  }

  switchPage(event: PageEvent) {
    this.store.dispatch(feature.actions.loadPage({pageNumber: event.pageIndex, pageSize: event.pageSize}));
  }
}
