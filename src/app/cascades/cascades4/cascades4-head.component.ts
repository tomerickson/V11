import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'
import { Cascades4FaceComponent } from './cascades4-face.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICascadesAllForm } from 'src/app/core/models/cascades-all-form.model';
import { ILookupDataModel } from 'src/app/core/models/lookup-data.model';
import { ReactionTypeEnum } from 'src/app/core/models/reaction-type-enum.model';
import { ReportParameters } from 'src/app/core/models/report-parameters.model';
import * as featureStore from 'src/app/state/cascades-all';
import * as appState from 'src/app/state/index';
@Component({
  selector: 'mfmp-cascades4-head',
  standalone: true,
  imports: [CommonModule, Cascades4FaceComponent],
  template:`<mfmp-cascades4-face
  [form]="form | async"
      [loading]="loading | async"
      [feedbackOptions]="feedbackOptions | async"
      (submitter)="loadReports($event)"></mfmp-cascades4-face>`,
  styles: []
})
export class Cascades4HeadComponent implements OnInit {
  store = inject(Store);
  loading!: Observable<boolean>;
  form!: Observable<ICascadesAllForm | null>;
  feedbackOptions!: Observable<ILookupDataModel[] | null>;
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.feedbackOptions = this.store.select(
      appState.feature.selectFuelFeedbackModes
    );
    this.loading = this.store.select(
      featureStore.feature.selectLoading
    );
    this.form = this.store.select(
      featureStore.feature.selectFormData
    );
  }

  /**
   * Configure the reports page for the cascades module,
   * dispatch the loadAllResults action, and redirect
   * to the reports page.
   * @param url
   */
  loadReports = (href: string) => {
    const extras: ReportParameters = {
      url: 'cascades-all',
      reactionType: ReactionTypeEnum.CascadesAll,
      query: href,
      tables: 3
    };

    this.store.dispatch(appState.actions.setReportParameters({ payload: extras }));
    this.store.dispatch(
      featureStore.actions.loadAllResults({ url: href })
    );
    this.router.navigate(['reports'], {
      relativeTo: this.activatedRoute.parent
    });
  };
}
