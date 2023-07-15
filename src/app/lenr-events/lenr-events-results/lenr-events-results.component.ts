import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent
} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ILenrEventsLookup } from 'src/app/core/models/lenr-events-lookup.model';

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
export class LenrEventsResultsComponent implements OnInit {

  private paginator!: MatPaginator;
  private tableSort!: MatSort;
  @Input({ required: true }) loading!: boolean | null;
  @Input({ required: true }) eventList!: ILenrEventsLookup[];
  @Output() fetch: EventEmitter<number> = new EventEmitter();

  @ViewChild('paginator', {static: true}) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  };
  @ViewChild('tableSort', {static: true}) set matSort(ms: MatSort) {
    this.tableSort = ms;
  }
  dataSource!: MatTableDataSource<ILenrEventsLookup>;
  length = 0;
  pageSize = 20;
  pageIndex = 0;
  sortedData: any[] = [];
  pageSizeOptions = [10, 15, 20, 50, 100];
  displayColumns = 'year,category,author,title,id'.split(',');
  pageEvent!: PageEvent;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;

   constructor() {
 
   }
  ngOnInit(): void {
    this.buildDataSource();
  }

  buildDataSource = () => {

      this.dataSource = new MatTableDataSource<ILenrEventsLookup>(
        this.eventList
      );
      this.dataSource.sort = this.tableSort;
      this.setupPaginator();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.tableSort;
      this.length = this.eventList.length;
 
  }
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

  clicked(e: Event, id: number) {
    e.stopPropagation();
    this.fetch.emit(id);
  }  
}