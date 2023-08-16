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
import * as localState from '../state/notes';
import { HtmlDirective } from '../shared/html.directive';
import { NotesFaceComponent } from './note-content/note-content.component';
import { HeaderProviderService } from '../shared/header/header.provider.service';

@Component({
  selector: 'mfmp-notes',
  standalone: true,
  imports: [CommonModule, MatCardModule, HtmlDirective, NotesFaceComponent],
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
