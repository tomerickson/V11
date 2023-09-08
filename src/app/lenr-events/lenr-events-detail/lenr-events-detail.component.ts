import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ILenrEventDetail } from 'src/app/core/models/lenr-event-detail.model';
import { ILenrEventsLookup } from 'src/app/core/models/lenr-events-lookup.model';

@Component({
  selector: 'mfmp-lenr-events-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './lenr-events-detail.component.html',
  styleUrls: ['./lenr-events-detail.component.scss']
})
export class LenrEventsDetailComponent {
  private _event!: ILenrEventDetail;
  private _eventList!: ILenrEventsLookup[] | null;

  @Input({ required: true }) set event(value: ILenrEventDetail) {
    this._event = value;
    this.setNextAndPriorIds();
  }
  get event(): ILenrEventDetail {
    return this._event;
  }
  @Input({ required: true }) set eventList(value: ILenrEventsLookup[] | null) {
    this._eventList = value;
    this.setNextAndPriorIds();
  }
  get eventList(): ILenrEventsLookup[] | null {
    return this._eventList;
  }
  nextId!: number;
  priorId!: number;

  @Output() back: EventEmitter<any> = new EventEmitter();
  @Output() navigator: EventEmitter<number> = new EventEmitter();


  goBack = () => {
    this.back.emit();
  };

  nextRow() {
    this.navigator.emit(this.nextId);
  }

  priorRow() {
    this.navigator.emit(this.priorId);
  }
  
  setNextAndPriorIds = (): void => {
    let next = 0;
    let prior = 0;
    if (this.event && this.eventList && this.eventList.length > 0) {
      const index = this.eventList.findIndex(
        (event) => event.id === this.event.id
      );
      if (index >= 0) {
        if (index < this.eventList.length - 1)
          next = this.eventList[index + 1].id;
        if (index > 0) prior = this.eventList[index - 1].id;
      }
    }
    this.nextId = next;
    this.priorId = prior;
  };
}
