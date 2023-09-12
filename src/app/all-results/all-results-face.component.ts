import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IAllResultsDataModel } from '../core/models/all-results-data.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'mfmp-all-results-face',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatTableModule, DatePipe],
  templateUrl: './all-results-face.component.html',
  styleUrls: ['./all-results-face.component.scss']
})
export class AllResultsFaceComponent implements AfterViewInit {

  @Input({ required: true }) set resultList(value: IAllResultsDataModel[] | null) {
    if (value) {
      this.dataSource.data = value;
    }
  };
  get resultList() {
    return this.dataSource.data;
  }

  @ViewChild('paginator') paginator!: MatPaginator;
  @Output() pager: EventEmitter<PageEvent> = new EventEmitter();

  displayColumns = ['query', 'size', 'date', 'link'];
  pageSizes = [5, 10, 15, 25];
  dataSource: MatTableDataSource<IAllResultsDataModel> = new MatTableDataSource();

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  tracker(index: any, item: any) {
    return item.link;
  }

  openLink(link: string) {
  }
}
