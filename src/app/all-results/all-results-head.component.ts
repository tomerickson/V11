import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllResultsFaceComponent } from './all-results-face.component';
import { Store } from '@ngrx/store';
import * as feature from '../state/all-results';
import { HeaderProviderService } from '../shared/header/header.provider.service';

@Component({
  selector: 'mfmp-all-results-head',
  standalone: true,
  imports: [CommonModule, AllResultsFaceComponent],
  template: `<mfmp-all-results-face></mfmp-all-results-face>`,
  styleUrls: []
})
export class AllResultsHeadComponent implements OnInit {

  store = inject(Store);
  headerService = inject(HeaderProviderService);


  ngOnInit(): void {
        this.headerService.buildPageHeader('all-results');
  }

}
