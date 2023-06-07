import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactionType } from 'src/app/core/models/reaction-type';
import { ReportPagesFaceComponent } from './report-pages.face.component';
import { Observable, Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { fusionFeature } from 'src/app/state/fusion';
import { AsyncPipe } from '@angular/common';
import { globalFeature } from 'src/app/state';
import { IReportParameters } from 'src/app/core/models/report-parameters.model';

@Component({
  standalone: true,
  selector: 'mfmp-report-pages',
  template: `
    <ng-container>
      <mfmp-report-pages-face
        (exit)="reset()"
        [parameters]="parameters"
        [reactionResults]="reactions"
        [nuclideResults]="nuclides"
        [elementResults]="elements"
        [reactionRows]="reactionRows"
        [nuclideRows]="nuclideRows"
        [elementRows]="elementRows"></mfmp-report-pages-face>
    </ng-container>
  `,
  imports: [ReportPagesFaceComponent, AsyncPipe]
})
export class ReportPagesHeadComponent implements OnInit, OnDestroy {
  router: Router = inject(Router);
  store: Store = inject(Store);

  parameters!: IReportParameters;
  reactions!: Observable<any[]>;
  nuclides!: Observable<any[]>;
  elements!: Observable<any[]>;
  reactionRows!: Observable<number>;
  nuclideRows!: Observable<number>;
  elementRows!: Observable<number>;
  subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.store
        .select(globalFeature.selectReportParameters)
        .subscribe((parms) => {
          this.parameters = parms;
          this.provideReports(this.parameters.type);
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
        break;
      default:
        throw `type '${type}' is Not implemented!`;
    }
  };
  reset = () => {
    this.router
      .navigate([this.parameters.url], { queryParams: { reset: true } })
      .then((rsp) => console.log('url', this.parameters.url, 'rsp:', rsp))
      .catch((err) => console.error(err));
  };
}
