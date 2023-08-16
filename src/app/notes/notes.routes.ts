import { Routes } from '@angular/router';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { NotesHeadComponent } from './notes.component';
import * as localState from '../state/notes';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { NotesService } from './notes.service';
import { HtmlDirective } from '../shared/html.directive';

export const NOTES_ROUTES: Routes = [
  {
    path: '',
    component: NotesHeadComponent,
    providers: [
      provideState(localState.feature),
      provideEffects([localState.effects]),
      {provide: HeaderProviderService, useClass: HeaderProviderService},
      {provide: NotesService, useClass: NotesService},
      // {provide: HtmlDirective, useClass: HtmlDirective}
    ]
  }
];
