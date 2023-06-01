import { AsyncPipe, NgIf } from '@angular/common';
import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule} from '@angular/material/progress-bar'
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { QueryResultsComponent } from '../query-results/query-results.component';
import { Observable, count, map, of, tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'mfmp-report-pages-face',
  templateUrl: './report-pages.face.component.html',
  styleUrls: ['./report-pages.face.component.scss'],
  imports: [
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatTabsModule,
    QueryResultsComponent,
    AsyncPipe,
    NgIf
  ]
})
export class ReportPagesFaceComponent implements OnInit, AfterContentInit {
  @Input({ required: true }) coreQuery!: string;
  @Input({ required: true }) reactionResults!: Observable<any[]>;
  @Input({ required: true }) nuclideResults!: Observable<any[]>;
  @Input({ required: true }) elementResults!: Observable<any[]>;
  @Input({required: true}) reactionRows!: Observable<number>;
  @Input({required: true}) nuclideRows!: Observable<number>;
  @Input({required: true}) elementRows!: Observable<number>;

  @Output() exit: EventEmitter<void> = new EventEmitter<void>();
  @Output() query: EventEmitter<string> = new EventEmitter<string>();

  ngAfterContentInit(): void {}

  ngOnInit(): void {
    this.url = this.router.routerState.snapshot.url;
  }
  
  store = inject(Store);
  router = inject(Router);
  url = '';

  reset = () => {
    this.exit.emit();
  };
}