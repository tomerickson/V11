import {
  AsyncPipe,
  CommonModule,
  NgIf,
  NgTemplateOutlet
} from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  signal
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent
} from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { ResultType } from 'src/app/core/models/result-type';
import { DownloadComponent } from '../download/download.component';
import { ColumnType } from 'src/app/core/models/column-type.type';
import { RestartFeatureComponent } from "../restart-feature/restart-feature.component";

@Component({
    selector: 'mfmp-query-face',
    standalone: true,
    templateUrl: './query-results.face.component.html',
    styleUrls: ['./query-results.face.component.scss'],
    imports: [
        NgIf,
        NgTemplateOutlet,
        AsyncPipe,
        CommonModule,
        MatCardModule,
        MatSortModule,
        MatTableModule,
        MatPaginatorModule,
        DownloadComponent,
        RestartFeatureComponent
    ]
})
export class QueryResultsFaceComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input({ required: true }) resultType!: ResultType;
  @Input({ required: true }) download!: any[];
  @Input({ required: true }) displayColumns!: string[];
  @Input({ required: true }) columnTypes!: ColumnType[];
  @Input({ required: true }) columnStyles!: string[];
  @Input({ required: true }) sortableColumns!: boolean[];
  @Input({ required: true }) inputResults!: Observable<any[]>;
  @Input({ required: true }) length!: number;

  @ViewChild('paginator', { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  subscriptions: Subscription = new Subscription();
  changeDetector = inject(ChangeDetectorRef);
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any[]>();
  values: any[] = []; // incoming data without the 1st row
  sortedData: any[] = [];

  ready = signal(false);
  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 25, 50, 100];
  pageEvent!: PageEvent;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  ngOnInit(): void {
    this.subscriptions.add(
      this.inputResults.subscribe((results) => {
        this.buildDataSource(results);
      })
    );
  }

  ngAfterViewInit(): void {
    this.setupPaginator();
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator?.firstPage();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  buildDataSource = (data: any[]) => {
    this.values = [...data];
    this.values.shift();
    const dataSource = new MatTableDataSource(this.values);
    dataSource.sort = this.sort;
    this.dataSource = dataSource;

    this.ready.set(true);
    this.changeDetector.detectChanges();
  };

  setupPaginator = () => {
    this.paginator.pageSize = this.pageSize;
    this.paginator.pageSizeOptions = this.pageSizeOptions;
    this.paginator.hidePageSize = false;
    this.paginator.showFirstLastButtons = true;
    this.paginator.pageIndex = 0;
  };

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

  sortData = (sort: Sort) => {
    const data = this.dataSource.data;
    let sortedData = data;
    if (data) {
      if (!sort.active || sort.direction === '') {
        return sortedData;
      }
      const isAsc = sort.direction === 'asc';
      const sortColumn: number = this.displayColumns?.findIndex(
        (cell) => cell == sort.active
      );
      let sortType: ColumnType = this.columnTypes[sortColumn];
      this.dataSource.data = data.sort((a, b) => {
        return this.compare(a[sortColumn], b[sortColumn], isAsc, sortType);
      });
      return this.sortedData;
    }
    return sortedData;
  };

  compare = (a: any, b: any, isAsc: boolean, sortType: ColumnType): number => {
    if (sortType === 'string') {
      return this.compareStrings(a, b, isAsc);
    } else {
      return this.compareNumbers(+a, +b, isAsc);
    }
  };

  compareStrings = (a: string, b: string, isAsc: boolean): number => {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  };

  compareNumbers = (a: number, b: number, isAsc: boolean): number => {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  };

  /**
   * Return colmmn names + data values
   * @param values
   * @returns
   */
  downloadable = (values: any[]) => {
    const data = [...values];
    data.unshift(this.displayColumns);
    return data;
  };
}