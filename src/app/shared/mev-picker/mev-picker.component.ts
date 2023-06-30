import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'mfmp-mev-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSliderModule],
  templateUrl: './mev-picker.component.html',
  styleUrls: []
})
/**
 * Limit the number of rows returned by a query:
 *
 * Usage:
 * <mfmp-mev-picker
 * [defaultLimit]= // number of MeV by default
 * [minimum] // minimum
 * [limitVerbiage] // text to present the current limit, e.g. Limit results to ... rows. (the ... will be replaced by the current value)
 * [usageVerbiage] // user instructions, e.g. Use the slider below to change the result limit.
 * ></mfmp-mev-picker>
 * 
 * Use class names mev-picker, mev-header,  or mev-slider to style the component
 */
export class MevPickerComponent {
  @Input({ required: true }) defaultLimit: number = 10;
  @Input({ required: true }) minimum: number = 0;
  @Input({ required: true }) maximum: number = 1000;
  @Input({ required: true }) step: number = 0.1;
  @Input({ required: true }) limitVerbiage!: string; // Ex: Limit results to ... MeV.
  @Input() usageVerbiage!: string; // Ex: Use the slider below to change the MeV limit.
  @Output() mevLimit: EventEmitter<number> = new EventEmitter<number>();

  private _limit: number = this.defaultLimit;
  get limit(): number {
    return this._limit;
  }
  set limit(value: number) {
    this._limit = value;
    this.mevLimit.emit(this._limit);
  }

  get limitText(): string {
    return this.limitVerbiage.replace('...', `${this.limit}`);
  }
}
