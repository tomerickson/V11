import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, of } from 'rxjs';
import { ReactionType } from 'src/app/core/models/reaction-type';
import { ReactionTypeEnum } from 'src/app/core/models/reaction-type-enum.model';
import { ReportParameters } from 'src/app/core/models/report-parameters.model';
import * as appState from 'src/app/state';
import * as allTablesState from '../../state/all-tables';
import * as cascadesState from 'src/app/state/cascades-all';
import * as fissionState from 'src/app/state/fission';
import * as fusionState from 'src/app/state/fusion';
import { feature } from 'src/app/state/two-up';
import { ReportPagesFaceComponent } from './report-pages.face.component';

@Component({
  standalone: true,
  selector: 'mfmp-report-pages',
  template: `
    <ng-container>
      <mfmp-report-pages-face
        [parameters]="parameters"
        [reactionResults]="reactions"
        [nuclideResults]="nuclides"
        [elementResults]="elements"
        [reactionRows]="reactionRows"
        [nuclideRows]="nuclideRows"
        [elementRows]="elementRows"
        [loading]="loading"
        [ready]="ready"></mfmp-report-pages-face>
    </ng-container>
  `,
  imports: [ReportPagesFaceComponent, AsyncPipe]
})
export class ReportPagesHeadComponent implements OnInit, OnDestroy {
  router: Router = inject(Router);
  store: Store = inject(Store);

  parameters!: ReportParameters;
  reactions!: Observable<any[]>;
  nuclides!: Observable<any[]>;
  elements!: Observable<any[]>;
  loading!: Observable<boolean>;
  ready!: Observable<boolean>;
  reactionRows!: Observable<number>;
  nuclideRows!: Observable<number>;
  elementRows!: Observable<number>;
  subscriptions: Subscription = new Subscription();
  returnUrl!: string;

  ngOnInit(): void {
    this.subscriptions.add(
      this.store
        .select(appState.feature.selectReportParameters)
        .subscribe((parms) => {
          this.parameters = parms;
          this.returnUrl = parms.url;
          this.provideReports(this.parameters.reactionType);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  provideReports = (type: ReactionType): void => {
    switch (type) {
      case ReactionTypeEnum.AllTables:
        this.reactions = this.store.select(
          allTablesState.feature.selectResults
        );
        this.reactionRows = this.store.select(
          allTablesState.feature.selectRows
        );
        this.nuclides = of([]);
        this.elements = of([]);
        this.nuclideRows = of(0);
        this.elementRows = of(0);
        this.loading = this.store.select(allTablesState.feature.selectLoading);
        this.ready = this.store.select(allTablesState.feature.selectReady);

        break;
      case ReactionTypeEnum.Fusion:
        this.reactions = this.store.select(fusionState.feature.selectReactionResults);
        this.nuclides = this.store.select(fusionState.feature.selectNuclideResults);
        this.elements = this.store.select(fusionState.feature.selectElementResults);
        this.reactionRows = this.store.select(fusionState.feature.selectReactionRows);
        this.nuclideRows = this.store.select(fusionState.feature.selectNuclideRows);
        this.elementRows = this.store.select(fusionState.feature.selectElementRows);
        this.loading = this.store.select(fusionState.feature.selectLoading);
        this.ready = this.store.select(fusionState.feature.selectReady);
        break;
      case ReactionTypeEnum.Fission:
        this.reactions = this.store.select(
          fissionState.feature.selectReactionResults
        );
        this.nuclides = this.store.select(fissionState.feature.selectNuclideResults);
        this.elements = this.store.select(fissionState.feature.selectElementResults);
        this.reactionRows = this.store.select(
          fissionState.feature.selectReactionRows
        );
        this.nuclideRows = this.store.select(fissionState.feature.selectNuclideRows);
        this.elementRows = this.store.select(fissionState.feature.selectElementRows);
        this.loading = this.store.select(fissionState.feature.selectLoading);
        this.ready = this.store.select(fissionState.feature.selectReady);
        break;
      case ReactionTypeEnum.TwoUp:
        this.reactions = this.store.select(feature.selectReactionResults);
        this.nuclides = this.store.select(feature.selectNuclideResults);
        this.elements = this.store.select(feature.selectElementResults);
        this.reactionRows = this.store.select(feature.selectReactionRows);
        this.nuclideRows = this.store.select(feature.selectNuclideRows);
        this.elementRows = this.store.select(feature.selectElementRows);
        this.loading = this.store.select(feature.selectLoading);
        this.ready = this.store.select(feature.selectReady);
        break;
      case ReactionTypeEnum.CascadesAll:
        this.reactions = this.store.select(
          cascadesState.feature.selectReactionResults
        );
        this.nuclides = this.store.select(
          cascadesState.feature.selectNuclideResults
        );
        this.elements = this.store.select(
          cascadesState.feature.selectElementResults
        );
        this.reactionRows = this.store.select(
          cascadesState.feature.selectReactionRows
        );
        this.nuclideRows = this.store.select(
          cascadesState.feature.selectNuclideRows
        );
        this.elementRows = this.store.select(
          cascadesState.feature.selectElementRows
        );
        break;
      default:
        console.log(`ReactionType '${type}' is undefined.`);
        break;
    }
  };
}
