import { CommonModule, DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  inject
} from '@angular/core';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IAllResultsDataModel } from '../core/models/all-results-data.model';
import { CustomPaginatorComponent } from '../shared/custom-paginator/custom-paginator.component';
import { PageNavigator } from '../shared/models/page-navigator';
import { ProgressSpinnerComponent } from '../shared/progress-spinner/progress-spinner.component';
import { AllResultsService } from './all-results.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'mfmp-all-results-face',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    DatePipe,
    CustomPaginatorComponent,
    ProgressSpinnerComponent
  ],
  templateUrl: './all-results-face.component.html',
  styleUrls: ['./all-results-face.component.scss']
})
export class AllResultsFaceComponent implements OnInit, AfterViewInit {
  featureService = inject(AllResultsService);

  _resultList!: IAllResultsDataModel[];
  pageIndex!: number;
  flowSwitch!: number;

  @Input({ required: true }) pageSize!: number | null;
  @Input({ required: true }) pageSizes!: number[];
  @Input({ required: true }) rows!: number | null;
  @Input({ required: true }) set ready(value: boolean | null) {
    this.flowSwitch = value ? 2 : 0 + (this.error ? 1 : 0);
  }
  @Input({ required: true }) set error(value: boolean | null) {
    this.flowSwitch = this.ready ? 2 : 0 + (value ? 1 : 0);
  }
  @Input({ required: true }) resultList!: IAllResultsDataModel[] | null;


  @ViewChild(MatSort) sort!: MatSort;
  @Output() sorter: EventEmitter<Sort> = new EventEmitter();
  @Output() opener: EventEmitter<string> = new EventEmitter();

  displayColumns = ['query', 'size', 'date', 'link'];
  dataSource!: MatTableDataSource<IAllResultsDataModel>
  sortedData: IAllResultsDataModel[] = [];

  sortTable(sort: Sort) {

    this.sorter.emit(sort);
    // const data = this.resultList?.slice();
/*     if (data) {

      if (!sort.active || sort.direction === '') {
        this.dataSource.data = data;
        return;
      }

      this.dataSource.data = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        return this.comp(
          sort.active as keyof IAllResultsDataModel,
          a,
          b,
          isAsc
        );
      });
    } */
  }

/*   comp = (
    prop: keyof IAllResultsDataModel,
    a: IAllResultsDataModel,
    b: IAllResultsDataModel,
    isAsc: boolean
  ): number => {
    console.log('sorting...')
    return a[prop] < b[prop] ? -1 : 1 * (isAsc ? 1 : -1);
  }; */

  ngOnInit(): void {
    this.buildDataSource();
  }

  ngAfterViewInit(): void {
    if (this.resultList) {
      this.dataSource.data = this.resultList;
      this.dataSource.sort = this.sort;
    }
  }

  buildDataSource = () => {
    this.dataSource = new MatTableDataSource(this.resultList || []);
  };

  tracker(index: any, item: any) {
    return item.link;
  }

  handlePageEvent(e: any) {
    const evt = new PageNavigator();
    evt.currentPage = e.currentPage;
    evt.pageSize = e.pageSize;
    evt.pageSizes = e.pageSizes;
    this.pageSize = evt.pageSize;
    this.pageIndex = evt.currentPage;
    this.pageSizes = evt.pageSizes;
    this.featureService.navigate(evt);
  }

  openLink = (e: string) => {
    this.opener.emit(e);
  };
}
