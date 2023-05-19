import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mfmp-query-results',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    MatCardModule,
    MatSortModule,
    MatTableModule
  ],
  templateUrl: './query-results.component.html',
  styleUrls: ['./query-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class QueryResultsComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() inputResults: any[] | null;
  @Input({ required: true }) sortBy: string = '';
  @Input({ required: true }) sortOrder: string = '';

  store: Store = inject(Store);
  dataSource!: MatTableDataSource<any>;
  displayColumns: string[] = [];

  results: any[] = [];
  sortedData: any[] = [];
  columnStyles: string[] = [];
  subscriptions: Subscription = new Subscription();

  constructor() {
    this.inputResults = [];
  }
  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];

      let curVal = JSON.stringify(change.currentValue);
      let prevVal = JSON.stringify(change.previousValue);
      console.log(`current: ${curVal}, previous: ${prevVal}`);

      if (propName === 'inputResults' && this.inputResults!.length > 0) {
        this.buildDataSource();
      }
    }
  };

  ngOnInit(): void {
    console.log('initializing element-results');
  };

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };

  buildDataSource = () => {
    if (this.inputResults!.length > 0) {
      this.displayColumns = this.inputResults![0];
      this.results = [...this.inputResults!];
      this.results.shift();
      this.dataSource = new MatTableDataSource(this.results);
      this.numbifyValues(this.results);
      this.setcolumnStyles(this.results[0]);
      console.log(this.results);
    }
  };

  /**
   * Convert numeric array elements to numbers
   * @param array
   * @returns
   */
  numbifyValues = (array: Array<any>): void => {
    for (let row of array) {
      for (let cell of row) {
        if (!isNaN(cell)) {
          cell = +cell;
        }
      }
    }
  };

  setcolumnStyles = (columns: any[]) => {
    for (let i = 0; i < columns.length; i++) {
      if (!isNaN(columns[i])) {
        this.columnStyles[i] = 'mat-column-number';
      } else {
        this.columnStyles[i] = 'mat-column-text';
      }
    }
  };

  sortData(sort: Sort) {
    const data = this.results.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      const sortColumn = this.displayColumns.findIndex(
        (cell) => cell == sort.active
      );
      return this.compare(a[sortColumn], b[sortColumn], isAsc);
    });
    this.results = this.sortedData;
    return this.sortedData;
  };

  compare = (a: any, b: any, isAsc: boolean): number => {
    if (isNaN(a)) {
      return this.compareStrings(a, b, isAsc);
    } else {
      return this.compareNumbers(a, b, isAsc);
    }
  };

  compareStrings = (a: string, b: string, isAsc: boolean): number => {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  };

  compareNumbers = (a: number, b: number, isAsc: boolean): number => {
    return (+a < +b ? -1 : 1) * (isAsc ? 1 : -1);
  };
}
