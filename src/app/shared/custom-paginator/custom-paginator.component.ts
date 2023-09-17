import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { PageNavigator } from '../models/page-navigator';

/**
 * Used by all-results to intercept the page event
 * and delegate it to the head component.  all-results
 * data is only loaded into the face component a page
 * at a time from the ngrx store.
 */
@Component({
  selector: 'mfmp-custom-paginator',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.scss']
})
export class CustomPaginatorComponent {
  private _rows!: number | undefined;

  // page: number = 1;
  pageSize: number = 10;
  firstRow: number = 1;
  lastRow: number = 10;
  endPage: number = 1;
  pageSizes: number[] = [5, 10, 15, 25];
  navigator: PageNavigator = new PageNavigator(1, this.pageSize, this.pageSizes)

  @Input({ required: true }) set rows(value: number | undefined) {
    this._rows = value;
    if (value) {
      this.endPage = Math.ceil(value / this.pageSize);
    }
  }
  get rows(): number | undefined {
    return this._rows;
  }

  pager: EventEmitter<PageNavigator> = new EventEmitter();

  setPageSize = (event: any): void => {
    this.pageSize = +event.srcElement.value;
    this.rows = this._rows; // to reset lastpage
    this.emitEvent(this.navigator.currentPage);
  };

  nextPage = () => {
    if (this.navigator.currentPage < this.endPage) {
      this.emitEvent(this.navigator.currentPage+1);
    } 
  };

  priorPage = () => {
    if (this.navigator.currentPage > 1) {
      this.emitEvent(this.navigator.currentPage-1);
    }
  };

  firstPage = () => {
    this.emitEvent(1);
  };

  lastPage = () => {
    this.emitEvent(this.endPage);
  };

  emitEvent = (page: number) => {

    this.navigator.currentPage = page;
    this.navigator.pageSize = this.pageSize;
    this.navigator.pageSizes = this.pageSizes;
    this.pager.emit(this.navigator);
  };
}