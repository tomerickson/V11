import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactionType } from 'src/app/core/models/reaction-type';
import { ReportPagesFaceComponent } from './report-pages.face.component';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { fusionFeature } from 'src/app/state/fusion';
import { AsyncPipe } from '@angular/common';
import { globalFeature } from 'src/app/state';
import { ReportParameters } from 'src/app/core/models/report-parameters.model';

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
        .select(globalFeature.selectReportParameters)
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
      case 'fusion':
        this.reactions = this.store.select(fusionFeature.selectReactionResults);
        this.nuclides = this.store.select(fusionFeature.selectNuclideResults);
        this.elements = this.store.select(fusionFeature.selectElementResults);
        this.reactionRows = this.store.select(fusionFeature.selectReactionRows);
        this.nuclideRows = this.store.select(fusionFeature.selectNuclideRows);
        this.elementRows = this.store.select(fusionFeature.selectElementRows);
        this.loading = this.store.select(fusionFeature.selectLoading);
        this.ready = this.store.select(fusionFeature.selectReady);
        break;
      default:
        console.log(`ReactionType '${type}' is undefined.`);
        break;
    }
  };
}
