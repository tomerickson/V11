import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import * as localState from '../state/tables-in-detail';
import { TablesInDetailFaceComponent } from './tables-in-detail-face.component';

@Component({
  selector: 'mfmp-tables-in-detail-head',
  standalone: true,
  imports: [CommonModule, TablesInDetailFaceComponent],
  template: `
    <mfmp-tables-in-detail-face
      [html]="html | async"></mfmp-tables-in-detail-face>
  `,
  styles: []
})
export class TablesInDetailHeadComponent {
  store = inject(Store);
  headerService = inject(HeaderProviderService);
  html: Observable<string> = of();

  @ViewChild('mfmpContent') container!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.headerService.buildPageHeader('tables-in-detail');
    this.html = this.store.select(localState.feature.selectHtml);
    this.store.dispatch(localState.actions.fetchPage());
  }
}
