import { AsyncPipe, CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
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
import {
  BehaviorSubject,
  Observable,
  Subscription
} from 'rxjs';
import { ResultType } from 'src/app/core/models/result-type';
import { DownloadComponent } from '../download/download.component';

@Component({
  selector: 'mfmp-query-results',
  standalone: true,
  imports: [
    NgIf,
    NgTemplateOutlet,
    AsyncPipe,
    CommonModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    DownloadComponent
  ],
  templateUrl: './query-results.component.html',
  styleUrls: ['./query-results.component.scss']
})
export class QueryResultsComponent implements AfterViewInit, AfterContentInit, OnDestroy {
  @Input({ required: true }) resultType!: ResultType;
  @Input() inputResults!: Observable<any[]>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  store: Store = inject(Store);
  dataSource!: MatTableDataSource<any>;

  displayColumns: string[] = [];
  results: any[] = [];
  sortedData: any[] = [];
  columnTypes: ColumnType[] = []; // Determined column type (numeric or non-numeric) for sorting purposes
  columnStyles: string[] = [];
  sortableColumns: boolean[] = [];
  subscriptions: Subscription = new Subscription();
  ready: BehaviorSubject<boolean> = new BehaviorSubject(false);
  pageSize = 25;
  pageIndex = 0;
  length = 0;
  pageSizeOptions = [5, 10, 25, 100];
  pageEvent!: PageEvent;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  ngAfterViewInit(): void {
    this.subscriptions.add(this.inputResults.subscribe((input) => {
      this.results = [...input];
      if (this.results.length > 0) {
        this.displayColumns = this.results[0];
        this.results.shift();
        this.length = this.results.length;
        this.dataSource = new MatTableDataSource(this.results);
        this.dataSource.paginator = this.paginator;
        this.paginator.firstPage();
        this.dataSource.sort = this.sort;
        this.numbifyValues(this.results);
        this.setColumnStyles(this.results[0]);
        this.setSortableColumns(this.results, this.displayColumns);

      }
    }));
  }

  ngAfterContentInit(): void {
   // this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  /**
   * Identify non-sortable columns
   * 
   * @param setPageSizeOptionsInput
   */
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

  setSortableColumns = (data: any[][], columns: any[]) => {
    this.sortableColumns.length = columns.length;
    for (let column = 0; column < columns.length; column++) {
      this.sortableColumns[column] = true;
    for (let row = 0; row < data.length; row++) {
      if (data[row][column] == 'null') {
        this.sortableColumns[column] = false;
        break;
      }
    }
  }
}

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
    if (columnType === undefined) {
      columnType = this.setColumnType(this.results, column);
    }
    return columnType;
  };

  setColumnType = (data: any[], column: number): ColumnType => {
    let strings: number = 0;
    for (let row = 0; row < data.length; row++) {
      let cell = data[row][column];
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
