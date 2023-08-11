import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import * as tableState from '../state/all-tables';
import { AllTablesFaceComponent } from './all-tables-face.component';

@Component({
  selector: 'mfmp-all-tables',
  standalone: true,
  imports: [CommonModule, AllTablesFaceComponent],
  template: `
    <mfmp-all-tables-face [query]="query()"></mfmp-all-tables-face>`
})

export class AllTablesHeadComponent implements OnInit {
  store = inject(Store);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  headerService = inject(HeaderProviderService);
  readonly query = this.store.selectSignal(tableState.feature.selectQuery);
  /**
   * set up the page header and get the current query from the host
   */
  ngOnInit(): void {
    this.headerService.buildPageHeader('all-tables');
    this.store.dispatch(tableState.actions.requestPage());
  }

  /**
   * Submit the query and redirect to the reports page
   *
   * @param form
   */
  submitForm(form: string) {
    this.store.dispatch(tableState.actions.loadResults({ query: form }));
    this.router.navigate(['reports'], { relativeTo: this.activatedRoute });
  }
}
