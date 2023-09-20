import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  inject
} from '@angular/core';
import { TestPageFaceComponent } from './testpage.face.component';
import { Store } from '@ngrx/store';
import { feature } from '../state/global.state';
import { IElementDataModel } from '../core/models/element-data.model';
import { Observable, Subscription } from 'rxjs';
import { CrudService } from '../core/services/crud.service';
import {
  ILenrEventsRequest,
  LenrEventsRequest
} from '../core/models/lenr-events-request.model';


@Component({
  standalone: true,
  template: `
    <mfmp-testpage
    [rows]= "(elements | async)?.length"></mfmp-testpage>

  `,
  imports: [CommonModule, TestPageFaceComponent]
})
export class TestpageHeadComponent implements OnInit,AfterViewInit, OnDestroy {
  
  store = inject(Store);
  crud = inject(CrudService);
  html!: Observable<string>;
  page = 'Select_LENR_Events.php';
  request!: ILenrEventsRequest;
  subsciptions: Subscription;

  elements: Observable<IElementDataModel[]> | null;

  constructor() {
    this.subsciptions = new Subscription();
    this.elements = this.store.select(feature.selectElements);
  }

  ngOnInit(): void {
    this.request = new LenrEventsRequest();
    this.request.s_Year_from = String(2022);
    this.request.s_Year_to = String(2023);
    this.request.s_Index_from = String(1);
    this.request.s_Index_to = String(5001);
    this.request.r_id_copy = '0';
    this.request.s_Category = 'All';
    this.request.doit = 'refresh';
  }
  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.subsciptions.unsubscribe();
  }

  initialize() {
    this.subsciptions.unsubscribe();
    this.html = this.crud.getPage(this.page);
  }
}
