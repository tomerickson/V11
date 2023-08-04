import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ICascadesAllForm } from "src/app/core/models/cascades-all-form.model";
import { ILookupDataModel } from "src/app/core/models/lookup-data.model";
import { cascadesAllFeature } from 'src/app/state/cascades-all';
import { globalFeature } from 'src/app/state/index';
import { CascadesSummaryFaceComponent } from "./cascades-summary.component";

@Component({
    selector: 'mfmp-cascades-summary',
    standalone: true,
    template: `<mfmp-cascades-summary-face
    [form]="form | async"
    [loading]="loading | async"
    [feedbackOptions]="feedbackOptions | async">
    </mfmp-cascades-summary-face>`,
    imports: [CommonModule, CascadesSummaryFaceComponent]
})
export class CascadesSummaryHeadComponent implements OnInit{

    store = inject(Store);
    loading!: Observable<boolean>;
    form!: Observable<ICascadesAllForm | null>;
    feedbackOptions!: Observable<ILookupDataModel[] | null>

    ngOnInit(): void {
        this.feedbackOptions = this.store
          .select(globalFeature.selectFuelFeedbackModes);
        this.loading = this.store.select(cascadesAllFeature.selectLoading);
        this.form = this.store.select(cascadesAllFeature.selectFormData);
      }
}