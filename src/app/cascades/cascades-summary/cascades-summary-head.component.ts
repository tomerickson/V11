import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICascadesAllForm } from 'src/app/core/models/cascades-all-form.model';
import { ILookupDataModel } from 'src/app/core/models/lookup-data.model';
import { ReactionTypeEnum } from 'src/app/core/models/reaction-type-enum.model';
import { ReportParameters } from 'src/app/core/models/report-parameters.model';
import * as featureStore from 'src/app/state/cascades-all';
import { globalFeature } from 'src/app/state/index';
import { PageActions } from '../../state/';
import { CascadesSummaryFaceComponent } from './cascades-summary-face.component';

@Component({
  selector: 'mfmp-cascades-summary',
  standalone: true,
  template: `
    <mfmp-cascades-summary-face
      [form]="form | async"
      [loading]="loading | async"
      [feedbackOptions]="feedbackOptions | async"
      (submitter)="loadReports($event)"></mfmp-cascades-summary-face>
  `,
  imports: [CommonModule, CascadesSummaryFaceComponent]
})
export class CascadesSummaryHeadComponent implements OnInit {
  store = inject(Store);
  loading!: Observable<boolean>;
  form!: Observable<ICascadesAllForm | null>;
  feedbackOptions!: Observable<ILookupDataModel[] | null>;
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.feedbackOptions = this.store.select(
      globalFeature.selectFuelFeedbackModes
    );
    this.loading = this.store.select(
      featureStore.cascadesAllFeature.selectLoading
    );
    this.form = this.store.select(
      featureStore.cascadesAllFeature.selectFormData
    );
  }

  loadReports = (url: string) => {
    const extras: ReportParameters = {
      url: 'cascades-all',
      reactionType: ReactionTypeEnum.CascadesAll,
      query: url
    };

    this.store.dispatch(PageActions.setReportParameters({ payload: extras }));
    this.store.dispatch(
      featureStore.CascadesAllActions.loadAllResults({ url: url })
    );
    this.router.navigate(['reports'], {
      relativeTo: this.activatedRoute.parent
    });
  };
}
