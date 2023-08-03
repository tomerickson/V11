import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { cascadesAllFeature } from 'src/app/state/cascades-all';
import { globalFeature } from 'src/app/state/index';
import { ProgressSpinnerComponent } from 'src/app/shared/progress-spinner/progress-spinner.component';
import { MatCardModule } from '@angular/material/card';
import { ICascadesAllForm } from 'src/app/core/models/cascades-all-form.model';
import { ILookupDataModel } from 'src/app/core/models/lookup-data.model';
@Component({
  selector: 'mfmp-cascades-summary',
  standalone: true,
  imports: [CommonModule, MatCardModule, ProgressSpinnerComponent],
  templateUrl: './cascades-summary.component.html',
  styleUrls: ['./cascades-summary.component.scss']
})
export class CascadesSummaryComponent implements OnInit {
  store = inject(Store);
  cdr = inject(ChangeDetectorRef);

  loading!: Observable<boolean>;
  feedbackOptions!: ILookupDataModel[];
  form!: ICascadesAllForm | null;

  ngOnInit(): void {
    this.store
      .select(globalFeature.selectFuelFeedbackModes)
      .pipe(map((items) => (this.feedbackOptions = items)));
    this.loading = this.store.select(cascadesAllFeature.selectLoading);
    this.store
      .select(cascadesAllFeature.selectFormData)
      .pipe(map((form) => {
        this.form = form;
        this.cdr.detectChanges();
      }));
  }

  feedbackDescription = (code: string | undefined): string | null => {
    if (typeof this.feedbackOptions === 'undefined') {
      return null;
    } else {
      const obj = this.feedbackOptions.find((item) => item.code === code);
      return obj ? obj.description : null;
    }
  };
}
