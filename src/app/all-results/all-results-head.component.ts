import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllResultsFaceComponent } from './all-results-face.component';

@Component({
  selector: 'mfmp-all-results-head',
  standalone: true,
  imports: [CommonModule, AllResultsFaceComponent],
  template: `<mfmp-all-results-face></mfmp-all-results-face>`,
  styleUrls: []
})
export class AllResultsHeadComponent {

}
