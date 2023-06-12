import {
  AsyncPipe,
  CommonModule,
  NgIf,
  NgTemplateOutlet
} from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  MatPaginatorModule,
  PageEvent
} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { ResultType } from 'src/app/core/models/result-type';
import { DownloadComponent } from '../download/download.component';
import { QueryResultsFaceComponent } from './query-results.face.component';

@Component({
  selector: 'mfmp-query-head',
  standalone: true,
  imports: [
    QueryResultsFaceComponent,
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
  template: `<mfmp-query-face
      [resultType]="resultType"
      [download]="(download | async)!"
      [sortableColumns]="sortableColumns"
      [displayColumns]="headers"
      [columnTypes]="columnTypes"
      [columnStyles]="columnStyles"
      [inputResults]="inputResults"
      [length]="length()"></mfmp-query-face>
  `,
  styles: []
})
export class QueryResultsHeadComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  @Input({ required: true }) resultType!: ResultType;
  @Input() inputResults!: Observable<any[]>;

  obj = new MatTableDataSource<any>();
  dataSource: Observable<MatTableDataSource<any>> = of(this.obj);
  store: Store = inject(Store);
  changeDetector = inject(ChangeDetectorRef);

  headers!: string[];
  download!: Subject<any[]>;
  sortedData: any[] = [];
  columnTypes: ColumnType[] = []; // Determined column type (numeric or non-numeric) for sorting purposes
  columnStyles: string[] = [];
  sortableColumns: boolean[] = [];
  subscriptions: Subscription = new Subscription();
  ready = signal(false);
  pageSize = 25;
  pageIndex = 0;
  length = signal(0);
  pageSizeOptions = [5, 10, 25, 100];
  pageEvent!: PageEvent;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  constructor() {
    this.download = new Subject<any[]>();
  }
  ngOnInit(): void {
    this.subscriptions.add(
      this.inputResults.subscribe((input) => {
        if (input.length > 0) {

          const headers = [...input[0]];
          let rows = [...input];
          rows.shift();
          this.headers = headers;
          const dataSource = new MatTableDataSource(rows);
          this.download.next(input);
          this.headers = headers;
          this.columnStyles = this.setColumnStyles(rows);
          this.sortableColumns = this.setSortableColumns(rows, headers);
          this.columnTypes = this.setColumnTypes(rows, headers);
          this.dataSource = of(dataSource);
          this.ready.set(true);
          this.length.set(rows.length);
        }
      })
    );
  }

  ngAfterContentInit(): void {
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
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

  setSortableColumns = (data: any[][], columns: any[]): boolean[] => {
    const sortableColumns = new Array<boolean>(columns.length);
    for (let column = 0; column < columns.length; column++) {
      sortableColumns[column] = true;
      for (let row = 0; row < data.length; row++) {
        if (data[row][column] == 'null') {
          sortableColumns[column] = false;
          break;
        }
      }
    }
    return sortableColumns;
  };

  setColumnStyles = (columns: any[]): string[] => {
    const columnStyles: string[] = new Array<string>(columns.length);
    for (let i = 0; i < columns.length; i++) {
      if (!isNaN(columns[i])) {
        columnStyles[i] = 'mat-column-number';
      } else {
        columnStyles[i] = 'mat-column-text';
      }
    }
    return columnStyles;
  };

  setColumnTypes = (data: any[], columns: any[]): ColumnType[] => {
    const columnTypes = new Array<ColumnType>(columns.length);
    for (let column = 0; column < columns.length; column++) {
      let strings: number = 0;
      for (let row = 0; row < data.length; row++) {
        let cell = data[row][column];
        cell !== null;
        strings += cell !== null && isNaN(cell) ? 1 : 0;
      }
      const columnType: ColumnType = strings > 0 ? 'string' : 'number';
      columnTypes[column] = columnType;
    }
    return columnTypes;
  };
}

declare type ColumnType = 'string' | 'number';
