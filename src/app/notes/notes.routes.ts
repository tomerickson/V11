import { Routes } from '@angular/router';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { NotesComponent } from './notes.component';

export const NOTES_ROUTES: Routes = [
  {
    path: '',
    component: NotesComponent,
    providers: [
      {provide: HeaderProviderService, useClass: HeaderProviderService}
    ]
  }
];
