import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import * as localState from '../state/notes';
import { NotesFaceComponent } from './note-content/note-content.component';

@Component({
    selector: 'mfmp-notes',
    imports: [CommonModule, MatCardModule, NotesFaceComponent],
    template: `<mfmp-note-content [html]="html | async"></mfmp-note-content>`,
    styles: []
})

export class NotesHeadComponent implements OnInit {

  store = inject(Store);
  headerService = inject(HeaderProviderService);
  html: Observable<string> = of();

  @ViewChild('mfmpContent') container!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.headerService.buildPageHeader('notes');
    this.html = this.store.select(localState.feature.selectHtml);
    this.store.dispatch(localState.actions.fetchPage());
   }
}
