import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ILenrEventsLookup } from 'src/app/core/models/lenr-events-lookup.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'mfmp-lenr-events-results',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './lenr-events-results.component.html',
  styleUrls: ['./lenr-events-results.component.scss']
})
export class LenrEventsResultsComponent implements OnChanges, AfterViewInit {
  @Input({ required: true }) loading!: boolean | null;
  @Input({ required: true }) eventList!: ILenrEventsLookup[] | null;
  @Output() fetch: EventEmitter<number> = new EventEmitter();
  @ViewChild('paginator', { static: false }) paginator!: MatPaginator;
  @ViewChild('tableSort') sort = new MatSort();

  dataSource!: MatTableDataSource<ILenrEventsLookup>;
  length = 0;
  pageSize = 15;
  pageIndex = 0;
  sortedData: any[] = [];
  pageSizeOptions = [10, 15, 25, 50, 100];
  displayColumns = 'year,category,author,title,id'.split(',');
  pageEvent!: PageEvent;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'eventList': {
            if (this.eventList) this.buildDataSource();
          }
        }
      }
    }
  }
  ngAfterViewInit(): void {
    // this.buildDataSource();
  }

  buildDataSource = () => {
    if (this.eventList) {
      this.dataSource = new MatTableDataSource<ILenrEventsLookup>(
        this.eventList
      );
      this.dataSource.sort = this.sort;
      this.setupPaginator();
      this.dataSource.paginator = this.paginator;
      this.length = this.eventList.length;
    }

    // this.ready.set(true);
    // this.changeDetector.detectChanges();
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

  clicked(row: ILenrEventsLookup) {
    this.fetch.emit(row.id);
  }

  search = () => {
    /*     const request = { ...this.eventForm.value } as LenrEventsRequest;
    request.doit = 'refresh';
    this.searcher.emit(request);
    this.tabGroup.selectedIndex = 1; */
  };
  /*
  stringify(obj: any): string {
    return JSON.stringify(obj);
  }
  
  sortData = (sort: Sort) => {
    type T = keyof typeof this.eventList;
    const data = this.dataSource.data;
    let sortedData = data;
    if (data) {
      if (!sort.active || sort.direction === '') {
        return sortedData;
      }
      const isAsc = sort.direction === 'asc';

      const sortField = this.displayColumns.find(cell => cell == sort.active) as T;
      const sortColumn: number = this.displayColumns?.findIndex(
        (cell) => cell == sort.active
      );
      let sortType: ColumnType = this.eventList[sortField];
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
  }; */
}
