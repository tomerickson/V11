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
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IAllResultsDataModel } from '../core/models/all-results-data.model';
import { CustomPaginatorComponent } from '../shared/custom-paginator/custom-paginator.component';
import { PageNavigator } from '../shared/models/page-navigator';
import { ProgressSpinnerComponent } from '../shared/progress-spinner/progress-spinner.component';
import { AllResultsService } from './all-results.service';

@Component({
  selector: 'mfmp-all-results-face',
  standalone: true,
  imports: [
    CommonModule,
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

  // @Input({ required: true }) navigator!: PageNavigator;
  @Input({ required: true }) pageSize!: number | null;
  @Input({ required: true }) pageSizes!: number[];
  @Input({ required: true }) rows!: number | null;
  @Input({ required: true }) set ready(value: boolean | null) {
    this.flowSwitch = (value) ? 2 : 0 + ((this.error) ? 1 : 0);
  };
  @Input({ required: true }) set error(value: boolean | null) {
    this.flowSwitch = (this.ready) ? 2 : 0 + ((value) ? 1 : 0);
  }
  @Input({ required: true }) set resultList(
    value: IAllResultsDataModel[] | null
  ) {
    if (value) {
      this._resultList = value;
    }
  }

  get resultList() {
    return this._resultList;
  }

  @ViewChild(MatSort) sort!: MatSort;
  @Output() opener: EventEmitter<string> = new EventEmitter();

  displayColumns = ['query', 'size', 'date', 'link'];
  dataSource: MatTableDataSource<IAllResultsDataModel> =
    new MatTableDataSource(this._resultList);

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
    // this.changeDetector.detectChanges();
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
    this.pageSizes = evt.pageSizes
    this.featureService.navigate(evt);
  }

  openLink = (e: string) => {
    this.opener.emit(e);
  };
}
