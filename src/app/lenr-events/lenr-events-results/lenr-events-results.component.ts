import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ILenrEventsLookup } from 'src/app/core/models/lenr-events-lookup.model';


@Component({
  selector: 'mfmp-lenr-events-results',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule],
  templateUrl: './lenr-events-results.component.html',
  styleUrls: ['./lenr-events-results.component.scss']
})
export class LenrEventsResultsComponent {

  @Input({required: true}) eventList!: ILenrEventsLookup[] | null;

  stringify(obj: any): string {
    return JSON.stringify(obj);
  }
}
