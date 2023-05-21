import { Component, Input, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { QueryResultsComponent } from '../shared/query-results/query-results.component';
import { Store } from '@ngrx/store';
import { FusionActions, fusionFeature } from '../state/fusion';
import { Observable, from, tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'mfmp-query-wrapper',
  template: `
    <mat-card>
      <mat-card-header>{{ coreQuery }}</mat-card-header>
      <mat-tab-group mat-stretch-tabs="false" animationDuration="250ms">
        <mat-tab label="Results ({{ fusionRows - 1 }})">
          <ng-container
            *ngIf="fusionResults; then fusionYes; else fusionNo"></ng-container>
          <ng-template #fusionYes>
            <mfmp-query-results
              [inputResults]="fusionResults | async"
              [sortBy]="sortBy"
              [sortOrder]="sortOrder"></mfmp-query-results>
          </ng-template>
          <ng-template #fusionNo>
            <h3>No results found</h3>
          </ng-template>
        </mat-tab>
        <mat-tab label="Nuclides ({{ nuclideRows - 1 }})">
          <ng-container
            *ngIf="
              nuclideResults;
              then nuclidesYes;
              else nuclidesNo
            "></ng-container>
          <ng-template #nuclidesNo>
            <h3>No results found</h3>
          </ng-template>
          <ng-template #nuclidesYes>
            <mfmp-query-results
              [inputResults]="nuclideResults | async"
              [sortBy]="''"
              [sortOrder]="''"></mfmp-query-results>
          </ng-template>
        </mat-tab>
        <mat-tab label="ELements ({{ elementRows - 1 }})">
          <ng-container
            *ngIf="
              elementResults;
              then elementsYes;
              else elementsNo
            "></ng-container>
          <ng-template #elementsNo>
            <h3>No results found</h3>
          </ng-template>
          <ng-template #elementsYes>
            <mfmp-query-results
              [inputResults]="elementResults | async"
              [sortBy]="''"
              [sortOrder]="''"></mfmp-query-results>
          </ng-template>
        </mat-tab>
      </mat-tab-group>
      <mat-card-actions align="end">
        <button
          type="button"
          mat-raised-button
          color="primary"
          (click)="reset()">
          Reset
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [],
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
