import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as appState from 'src/app/state';
import { ReportParameters } from 'src/app/core/models/report-parameters.model';


@Component({
  selector: 'mfmp-restart-feature',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `<button type="button" mat-raised-button color="primary" (click)="reset()">
  Again?
</button>`,
  styles: ['']
})

/**
 * Re-launch the feature that invoked the report hosting this component
 */
export class RestartFeatureComponent implements OnInit, OnDestroy {

  router = inject(Router);
  store = inject(Store)
  returnUrl!: string;
  parameters!: ReportParameters;
  subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.store
        .select(appState.feature.selectReportParameters)
        .subscribe((parms) => {
          this.parameters = parms;
          this.returnUrl = parms.url;
        })
    );    
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  reset = () => {
    this.router
      .navigate([this.returnUrl], { queryParams: { reset: true } })
      .catch((err) => console.error(err));
  };
}
