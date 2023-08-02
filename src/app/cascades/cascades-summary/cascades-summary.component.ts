import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { cascadesAllFeature } from 'src/app/state/cascades-all';
import { ProgressSpinnerComponent } from 'src/app/shared/progress-spinner/progress-spinner.component';
import { MatCardModule } from '@angular/material/card';
import { ICascadesAllForm } from 'src/app/core/models/cascades-all-form.model';
@Component({
  selector: 'mfmp-cascades-summary',
  standalone: true,
  imports: [CommonModule, MatCardModule, ProgressSpinnerComponent],
  templateUrl: './cascades-summary.component.html',
  styleUrls: ['./cascades-summary.component.scss']
})
export class CascadesSummaryComponent implements OnInit {
  store = inject(Store);

  loading!: Observable<boolean>;
  form!: Observable<ICascadesAllForm | null>

  ngOnInit(): void {
    this.loading = this.store.select(cascadesAllFeature.selectLoading);
    this.form = this.store.select(cascadesAllFeature.selectFormData);
  }
}
