import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactionType } from 'src/app/core/models/reaction-type';
import { ReportPagesFaceComponent } from './report-pages.face.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { fusionFeature } from 'src/app/state/fusion';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'mfmp-report-pages',
  template: `
    <ng-container (exit)="reset()">
      <mfmp-report-pages-face
        [coreQuery]="coreQuery"
        [reactionResults]="reactions"
        [nuclideResults]="nuclides"
        [elementResults]="elements"
        [reactionRows]="reactionRows"
        [nuclideRows]="nuclideRows"
        [elementRows]="elementRows"></mfmp-report-pages-face>
    </ng-container>
  `,
  imports: [ReportPagesFaceComponent,
  AsyncPipe]
})
export class ReportPagesHeadComponent implements OnInit {
  router: Router = inject(Router);
  store: Store = inject(Store);

  @Input({alias: 'query', required: true }) coreQuery!: string;
  @Input({ required: true }) url!: string; // url of the calling component
  @Input({alias: 'type', required: true }) reactionType!: ReactionType;

  reactions!: Observable<any[]>;
  nuclides!: Observable<any[]>;
  elements!: Observable<any[]>;
  reactionRows!: Observable<number>;
  nuclideRows!: Observable<number>;
  elementRows!: Observable<number>;

  ngOnInit(): void {
    this.provideReports(this.reactionType);
  }

  provideReports = (type: ReactionType): void  => {

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
  }
  reset = () => {
    this.router
      .navigate([this.url], { queryParams: { reset: true } })
      .then((rsp) => console.log('url', this.url, 'rsp:', rsp))
      .catch((err) => console.error(err));
  };
}
