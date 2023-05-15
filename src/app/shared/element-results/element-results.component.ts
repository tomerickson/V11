import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { Observable, Subscription, from, tap } from 'rxjs';
import * as fusionState from '../../state/fusion';

@Component({
  selector: 'mfmp-element-results',
  standalone: true,
  imports: [AsyncPipe, CommonModule, MatCardModule, MatTableModule],
  templateUrl: './element-results.component.html',
  styleUrls: ['./element-results.component.scss']
})
export class ElementResultsHeadComponent implements OnInit, OnDestroy {
  store: Store = inject(Store);
  displayColumns: string[] = [];
  elements: any[] = [];
  subscriptions: Subscription = new Subscription();
  elements$: Observable<any>;
  doodles = [1,2,3,4,5]

  ngOnInit(): void {
    console.log('initializing element-results')
    this.elements$ = fusionState.fusionFeature.selectElementResults;
    this.elements$.pipe(tap(elements => console.log("elements:", elements)));
    this.elements$.subscribe((table: any[]) => this.buildDataSource(table));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  buildDataSource = (table: any[]) => {
    this.elements$.pipe(tap((elements: any[]) => console.log("elements:", elements.length)));
      this.displayColumns = table[0];
      this.elements = table.splice(0, 1);
  }
}
