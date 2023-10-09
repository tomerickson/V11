import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ICascadesAllForm } from 'src/app/core/models/cascades-all-form.model';
import { ILookupDataModel } from 'src/app/core/models/lookup-data.model';
import { ProgressSpinnerComponent } from 'src/app/shared/progress-spinner/progress-spinner.component';

@Component({
  selector: 'mfmp-cascades4-face',
  standalone: true,
  imports: [CommonModule, MatBadgeModule, MatButtonModule, MatCardModule, MatExpansionModule, MatIconModule, ProgressSpinnerComponent],
  templateUrl: './cascades4-face.component.html',
  styleUrls: ['./cascades4-face.component.scss']
})
export class Cascades4FaceComponent {
  
  @Input({required: true}) form!: ICascadesAllForm | null;
  @Input({required: true}) loading!: boolean | null;
  @Input({required: true}) feedbackOptions!: ILookupDataModel[] | null;
  @Output() submitter = new EventEmitter<string>();

  loadResults = () => {
    this.submitter.emit(this.form?.resultsLink);
  }}
