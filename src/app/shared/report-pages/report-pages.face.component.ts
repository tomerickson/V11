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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QueryResultsComponent } from '../query-results/query-results.component';
import { IReportParameters } from 'src/app/core/models/report-parameters.model';

@Component({
  standalone: true,
  selector: 'mfmp-report-pages-face',
  templateUrl: './report-pages.face.component.html',
  styleUrls: ['./report-pages.face.component.scss'],
  imports: [
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    QueryResultsComponent,
    AsyncPipe,
    NgIf
  ]
})
export class ReportPagesFaceComponent implements OnInit, AfterContentInit {
  @Input({ required: true }) parameters!: IReportParameters | null;
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
