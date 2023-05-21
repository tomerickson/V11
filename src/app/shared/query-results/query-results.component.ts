import { AsyncPipe, CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  inject
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent
} from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription, reduce } from 'rxjs';

@Component({
  selector: 'mfmp-query-results',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './query-results.component.html',
  styleUrls: ['./query-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class QueryResultsComponent implements AfterViewInit, OnDestroy {
  @Input() inputResults: any[] | null;
  @Input({ required: true }) sortBy: string = '';
  @Input({ required: true }) sortOrder: string = '';
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  store: Store = inject(Store);
  dataSource!: MatTableDataSource<any>;

  displayColumns: string[] = [];
  results: any[] = [];
  sortedData: any[] = [];
  columnTypes: ColumnType[] = []; // Determined column type (numeric or non-numeric) for sorting purposes
  columnStyles: string[] = [];
  subscriptions: Subscription = new Subscription();

  pageSize = 10;
  pageIndex = 0;
  length = this.pageSize;
  pageSizeOptions = [5, 10, 25];
  pageEvent!: PageEvent;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  constructor() {
    this.inputResults = [];
  }
  ngAfterViewInit(): void {
    this.buildDataSource();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  buildDataSource = () => {
    if (this.inputResults!.length > 0) {
      this.displayColumns = this.inputResults![0];
      this.results = [...this.inputResults!];
      this.results.shift();
      this.length = this.results.length;
      this.dataSource = new MatTableDataSource(this.results);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.numbifyValues(this.results);
      this.setColumnStyles(this.results[0]);
      console.log(this.results);
    }
  };
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
  /**
   * Convert numeric array elements to numbers
   * @param array
   * @returns
   */
  numbifyValues = (array: Array<any>): void => {
    /*     for (let row of array) {
      for (let cell of row) {
        if (!isNaN(cell)) {
          cell = +cell;
        }
      }
    } */
  };

  setColumnStyles = (columns: any[]) => {
    for (let i = 0; i < columns.length; i++) {
      if (!isNaN(columns[i])) {
        this.columnStyles[i] = 'mat-column-number';
      } else {
        this.columnStyles[i] = 'mat-column-text';
      }
    }
  };

  getColumnType = (column: number): ColumnType => {
    let columnType = this.columnTypes[column];
    if (columnType === null) {
      columnType = this.setColumnType(this.results, column);
    }
    return columnType;
  };

  setColumnType = (data: any[], column: number): ColumnType => {
    let strings: number = 0;
    for (let i = 0; i < data.length; i++) {
      let cell = data[i][column];
      cell !== null;
      strings += cell !== null && isNaN(cell) ? 1 : 0;
    }
    const columnType: ColumnType = strings > 0 ? 'string' : 'number';
    this.columnTypes[column] = columnType;
    return columnType;
  };
  sortData = (sort: Sort) => {
    const data = this.results;
    if (!sort.active || sort.direction === '') {
      this.sortedData = this.results;
      return;
    }
    const isAsc = sort.direction === 'asc';
    const sortColumn: number = this.displayColumns.findIndex(
      (cell) => cell == sort.active
    );

    /**
     * Determine as best we can whether the column is numeric or string
     */
    let sortType: ColumnType = this.getColumnType(sortColumn);

    console.log(`column ${sort.active} is a ${sortType}`);
    this.sortedData = data.sort((a, b) => {
      return this.compare(a[sortColumn], b[sortColumn], isAsc, sortType);
    });
    this.results = this.sortedData;
    return this.sortedData;
  };

  compare = (a: any, b: any, isAsc: boolean, sortType: ColumnType): number => {
    if (sortType === 'string') {
      return this.compareStrings(a, b, isAsc);
    } else {
      return this.compareNumbers(+a, +b, isAsc);
    }
  };

  compareStrings = (a: string, b: string, isAsc: boolean): number => {
    // a = a || '';
    // b = b || '';
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  };

  compareNumbers = (a: number, b: number, isAsc: boolean): number => {
    // a = a || 0;
    // b = b || 0;
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  };
}

declare type ColumnType = 'string' | 'number';
