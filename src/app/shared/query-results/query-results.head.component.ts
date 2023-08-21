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
import { ColumnType } from 'src/app/core/models/column-type.type';

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
      [length]="length()"
      [paginate]="paginate"></mfmp-query-face>
  `,
  styles: []
})
export class QueryResultsHeadComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  @Input({ required: true }) resultType!: ResultType;
  @Input() inputResults!: Observable<any[]>;
  @Input() paginate: boolean = true;

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

          this.setColumnTypes(rows, headers);
          this.setColumnStyles();
          this.setSortableColumns();

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
   * Identify sortable columns
   *
   * @param setPageSizeOptionsInput
   */
  setSortableColumns = (): void => {
    const sortableColumns = new Array<boolean>(this.columnTypes.length);
    for (let column = 0; column < this.columnTypes.length; column++) {
      sortableColumns[column] = (this.columnTypes[column] != 'null');
    }
    this.sortableColumns = sortableColumns;
  };

  /**
   * Select classes to align text based on columnTypes 
   * @param columnTypes 
   * @returns 
   */
  setColumnStyles = (): void => {
    const columnStyles: string[] = new Array<string>(this.columnTypes.length);
    const textStyle = '';
    const numberStyle = 'mat-column-number';
    const nullStyle = 'mat-column-null';

    for (let i = 0; i < this.columnTypes.length; i++) {
      const value = this.columnTypes[i];
      if (value === 'null') {
        columnStyles[i] = nullStyle;
      } else if (value === 'number') {
        columnStyles[i] = numberStyle;
      } else {
        columnStyles[i] = textStyle;
      }
    }
    this.columnStyles = columnStyles;
  };

  /**
   * For styling purposes we need to know if a column's content
   * contains numbers, strings, or if there are null values
   * @param data 
   * @param columns 
   * @returns arrary of ['string', 'number', 'null']
   */
  setColumnTypes = (data: any[], columns: any[]): void => {
    const columnTypes = new Array<ColumnType>(columns.length);
    for (let column = 0; column < columns.length; column++) {
      let strings: number = 0;
      let numerics: number = 0;
      let nulls: number = 0;
      for (let row = 0; row < data.length; row++) {
        let cell = data[row][column];
        nulls += ((cell === 'null') ? 1 : 0);
        strings += ((cell !== null && isNaN(cell)) ? 1 : 0)
        numerics += ((cell !== null && !isNaN(cell)) ? 1 : 0);
      }
      const columnType: ColumnType = (nulls > 0) ? 'null' : (numerics > 0) ? 'number' : 'string';
      columnTypes[column] = columnType;
    }
    this.columnTypes = columnTypes;
  };
}
