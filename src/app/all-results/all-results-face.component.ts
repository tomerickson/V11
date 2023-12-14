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
import { MatCardModule } from '@angular/material/card';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
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
  }

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

  handlePageEvent(e: PageNavigator) {
    console.log('from custompaginator.nextPage')
    const evt = e as PageNavigator;
    evt.page = e.page;
    evt.size = e.size;
    evt.sizes = e.sizes;
    this.pageSize = evt.size;
    this.pageIndex = evt.page;
    this.pageSizes = evt.sizes;
    this.featureService.navigate(evt);
  }

  openLink = (e: string) => {
    this.opener.emit(e);
  };
}
