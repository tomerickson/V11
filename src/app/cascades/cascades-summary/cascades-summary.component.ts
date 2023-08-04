import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ICascadesAllForm } from 'src/app/core/models/cascades-all-form.model';
import { ILookupDataModel } from 'src/app/core/models/lookup-data.model';
import { ProgressSpinnerComponent } from 'src/app/shared/progress-spinner/progress-spinner.component';

@Component({
  selector: 'mfmp-cascades-summary-face',
  standalone: true,
  imports: [CommonModule, MatCardModule, ProgressSpinnerComponent],
  templateUrl: './cascades-summary.component.html',
  styleUrls: ['./cascades-summary.component.scss']
})
export class CascadesSummaryFaceComponent {
  
  @Input({required: true}) form!: ICascadesAllForm | null;
  @Input({required: true}) loading!: boolean | null;
  @Input({required: true}) feedbackOptions!: ILookupDataModel[] | null;
  
  feedbackDescription = (code: string | undefined): string | null => {
    if (typeof this.feedbackOptions === 'undefined') {
      return null;
    } else {
      const obj = this.feedbackOptions?.find((item) => item.code === code);
      return obj ? obj.description : null;
    }
  };
}
