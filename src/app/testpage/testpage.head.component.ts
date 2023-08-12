import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
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
import { TestpagePushComponent } from './testpage.push.component';

@Component({
  selector: 'dummy',
  standalone: true,
  template: `
    <mfmp-testpage
      [elements]="elements | async"
      [html]="html"
      [model]="request"
      (action)="handleit($event)"></mfmp-testpage>
    <mfmp-testpage-push [model]="request"></mfmp-testpage-push>
  `,
  imports: [CommonModule, TestPageFaceComponent, TestpagePushComponent]
})
export class TestpageHeadComponent implements OnInit,AfterViewInit, OnDestroy {
  
  @ViewChild(TestpagePushComponent) pushComponent!: TestpagePushComponent;
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

  fetchEvents() {
    // this.request = new LenrEventsRequest();
    // this.request.s_Year_from = String(2022);
    // this.request.s_Year_to = String(2023);
    // this.request.s_Index_from = String(1);
    // this.request.s_Index_to = String(5001);
    // this.request.r_id_copy = '0';
    // this.request.s_Category = 'All';
    // this.request.doit = 'refresh';
    // console.log('request', this.request.asFormData());
    // const push = new TestpagePushComponent();
    // push.model = this.request;
    // push.submit();
    const formData = new FormData(this.pushComponent.form);
    console.table(formData);
    // this.html = this.crud.postPage(this.page, this.request.asFormData());
  }

  handleit(event: string) {
    if (event === 'fetch') this.fetchEvents();
    if (event === 'initialize') this.initialize();
  }
}
