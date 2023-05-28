import { Component, Input, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { QueryResultsComponent } from '../../shared/query-results/query-results.component';
import { Store } from '@ngrx/store';
import { FusionActions, fusionFeature } from '../../state/fusion';
import { Observable, from, tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'mfmp-query-wrapper',
  templateUrl: './query-wrapper.component.html',
  styleUrls: [
    './query-wrapper.component.scss'
  ],
  imports: [
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    QueryResultsComponent,
    AsyncPipe,
    NgIf
  ]
})
export class QueryWrapperComponent implements OnInit {
  ngOnInit(): void {
    this.fusionResults = this.store
      .select(fusionFeature.selectFusionResults)
      .pipe(tap((rows) => (this.fusionRows = rows.length)));
    this.nuclideResults = this.store
      .select(fusionFeature.selectNuclideResults)
      .pipe(tap((rows) => (this.nuclideRows = rows.length)));
    this.elementResults = this.store
      .select(fusionFeature.selectElementResults)
      .pipe(tap((rows) => (this.elementRows = rows.length)));
  }

  fusionResults!: Observable<any[]>;
  nuclideResults!: Observable<any[]>;
  elementResults!: Observable<any[]>;
  fusionRows = 0;
  nuclideRows = 0;
  elementRows = 0;

  @Input({ required: true }) sortBy: string = '';
  @Input({ required: true }) sortOrder: string = '';
  @Input({ required: true }) coreQuery: string = '';
  store = inject(Store);

  constructor() {
    this.fusionResults = from([]);
    this.nuclideResults = from([]);
    this.elementResults = from([]);
  }

  reset = () => {
    this.store.dispatch(FusionActions.reset());
  };
}
