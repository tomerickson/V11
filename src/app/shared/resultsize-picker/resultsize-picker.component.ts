import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'mfmp-resultsize-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSliderModule],
  templateUrl: './resultsize-picker.component.html',
  styleUrls: []
})
/**
 * Limit the number of rows returned by a query:
 *
 * Usage:
 * <mfmp-resultsize-picker
 * [defaultLimit]= // number of rows by default
 * [minimum] // minimum rows
 * [maximum] // maximum rows
 * [limitVerbiage] // text to present the current limit, e.g. Limit results to ... rows. (the ... will be replaced by the current value)
 * ></mfmp-resultsize-picker>
 * 
 * Use class names resultsize-picker, resultsize-header,  or resultsize-slider to style the component
 */
export class ResultsizePickerComponent {
  @Input({ required: true }) defaultLimit: number = 1000;
  @Input({ required: true }) minimum: number = 0;
  @Input({ required: true }) maximum: number = 1000;
  @Input({ required: true }) step: number = 50;
  @Input({ required: true }) limitVerbiage!: string; // Ex: Limit results to ... rows.
  @Output() limitSize: EventEmitter<number> = new EventEmitter<number>();

  private _limit: number = this.defaultLimit;
  get limit(): number {
    return this._limit;
  }
  set limit(value: number) {
    this._limit = value;
    this.limitSize.emit(this._limit);
  }

  get limitText(): string {
    return this.limitVerbiage.replace('...', `${this.limit}`);
  }
}
