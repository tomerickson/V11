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
import { ReportParameters } from 'src/app/core/models/report-parameters.model';
import { QueryResultsHeadComponent } from '../query-results/query-results.head.component';
import { CodeCopyCompoonent } from '../code-copy/code-copy.component';

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
    QueryResultsHeadComponent,
    AsyncPipe,
    NgIf,
    CodeCopyCompoonent
  ]
})
export class ReportPagesFaceComponent implements OnInit, AfterContentInit {
  @Input({ required: true }) parameters!: ReportParameters;
  @Input({ required: true }) reactionResults!: Observable<any[]>;
  @Input({ required: true }) nuclideResults!: Observable<any[]>;
  @Input({ required: true }) elementResults!: Observable<any[]>;
  @Input({ required: true }) reactionRows!: Observable<number>;
  @Input({ required: true }) nuclideRows!: Observable<number>;
  @Input({ required: true }) elementRows!: Observable<number>;
  @Input({ required: true }) loading!: Observable<boolean>;
  @Input({ required: true }) ready!: Observable<boolean>;
  @Output() query: EventEmitter<string> = new EventEmitter<string>();

  ngAfterContentInit(): void {
  
  }

  ngOnInit(): void {
    this.url = this.router.routerState.snapshot.url;
  }

  store = inject(Store);
  router = inject(Router);
  url = '';
}
