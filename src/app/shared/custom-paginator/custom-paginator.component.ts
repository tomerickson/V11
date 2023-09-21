import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    MatSelectModule
  ],
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.scss']
})
export class CustomPaginatorComponent {
  pageSize: number = 10;
  pageSizes: number[] = [5, 10, 15, 25];
  navigator: PageNavigator = {page: 1, size: this.pageSize, sizes: this.pageSizes}

  @Input({ required: true }) rows: number | undefined;
  @Output() pager: EventEmitter<PageNavigator> = new EventEmitter();

  get endPage() {
    return Math.ceil(this.rows ? this.rows / this.pageSize : 1);
  }

  setPageSize = (event: any): void => {
    this.pageSize = +event.srcElement.value;
    // this.rows = this._rows; // to reset lastpage
    this.emitEvent(this.navigator.page);
  };

  firstRow = () => {
    return (this.navigator.page-1)* this.navigator.size + 1;
  }
  lastRow = () => {
    return Math.min(this.navigator.page * this.navigator.size, (this.rows) ? this.rows : 0);
  }
  nextPage = () => {
    this.emitEvent(this.navigator.page + 1);
  };

  priorPage = () => {
    this.emitEvent(this.navigator.page - 1);
  };

  firstPage = () => {
    this.emitEvent(1);
  };

  lastPage = () => {
    this.emitEvent(this.endPage);
  };

  emitEvent = (page: number) => {
    const navigator: PageNavigator = {page: page, size: this.pageSize, sizes: this.pageSizes};
    this.navigator = navigator;
    this.pager.emit(navigator);
  };
}
