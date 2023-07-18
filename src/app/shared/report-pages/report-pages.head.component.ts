import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactionType } from 'src/app/core/models/reaction-type';
import { ReportPagesFaceComponent } from './report-pages.face.component';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { fusionFeature } from 'src/app/state/fusion';
import { fissionFeature } from 'src/app/state/fission';
import { twoupFeature} from 'src/app/state/two-up';
import { AsyncPipe } from '@angular/common';
import { globalFeature } from 'src/app/state';
import { ReportParameters } from 'src/app/core/models/report-parameters.model';
import { ReactionTypeEnum } from 'src/app/core/models/reaction-type-enum.model';

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
      case ReactionTypeEnum.Fusion:
        this.reactions = this.store.select(fusionFeature.selectReactionResults);
        this.nuclides = this.store.select(fusionFeature.selectNuclideResults);
        this.elements = this.store.select(fusionFeature.selectElementResults);
        this.reactionRows = this.store.select(fusionFeature.selectReactionRows);
        this.nuclideRows = this.store.select(fusionFeature.selectNuclideRows);
        this.elementRows = this.store.select(fusionFeature.selectElementRows);
        this.loading = this.store.select(fusionFeature.selectLoading);
        this.ready = this.store.select(fusionFeature.selectReady);
        break;
        case ReactionTypeEnum.Fission:
          this.reactions = this.store.select(fissionFeature.selectReactionResults);
          this.nuclides = this.store.select(fissionFeature.selectNuclideResults);
          this.elements = this.store.select(fissionFeature.selectElementResults);
          this.reactionRows = this.store.select(fissionFeature.selectReactionRows);
          this.nuclideRows = this.store.select(fissionFeature.selectNuclideRows);
          this.elementRows = this.store.select(fissionFeature.selectElementRows);
          this.loading = this.store.select(fissionFeature.selectLoading);
          this.ready = this.store.select(fissionFeature.selectReady);
          break;
          case ReactionTypeEnum.TwoUp:
            this.reactions = this.store.select(twoupFeature.selectReactionResults);
            this.nuclides = this.store.select(twoupFeature.selectNuclideResults);
            this.elements = this.store.select(twoupFeature.selectElementResults);
            this.reactionRows = this.store.select(twoupFeature.selectReactionRows);
            this.nuclideRows = this.store.select(twoupFeature.selectNuclideRows);
            this.elementRows = this.store.select(twoupFeature.selectElementRows);
            this.loading = this.store.select(twoupFeature.selectLoading);
            this.ready = this.store.select(twoupFeature.selectReady);
              

            break;
      default:
        console.log(`ReactionType '${type}' is undefined.`);
        break;
    }
  };
}
