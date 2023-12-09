import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  FormsModule
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatSliderModule} from '@angular/material/slider';
import { changeSetItemFactory } from '@ngrx/data';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mfmp-slider-input',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSliderModule],
  templateUrl: './slider-input.component.html',
  styleUrl: './slider-input.component.scss'
})

/**
 * A component that combines a mat-slider, an optional mat-label, and an optional
 * value to display the current value of the slider.
 *
 * elements can be displayed vertically or horizonally depending on the value
 * of the 'layout' parameter, and in any order, determined by the 'elements'
 * paramter.
@param minimum // minimum value accepted by the slider
@param maximum // maximum value accepted by the slider;
@param default // default value of the slider
@param step // slider increment step
@param controlName // The name of the parent control
@param layout // 'column' or 'row'
@param elements // array of 'label', 'value', 'slider' in the order to be presented
@param label // lalbel
@output 
 */
export class SliderInputComponent implements OnInit {

  @Input() minimum = 0;
  @Input({required: true}) maximum! :number;
  @Input() default = 1;
  @Input() step = 1;
  @Input() controlName!: string;
  @Input() layout!: sliderLayoutDirection;// horizontal or vertical
  @Input() elements!: sliderElement[] // label first or value first
  @Input() label!: string; // Ex: Limit results to ... rows.
  @Output() sliderValue: EventEmitter<{ key: string; value: number }> =
    new EventEmitter();

  private _value: number = this.default;

  get value(): number {
    return this._value;
  }
  set value(value: number) {
    this._value = value;
    this.sliderValue.emit({ key: this.controlName, value: value });
  }

  ngOnInit(): void {
    // this.setClass();
    this.value = this.default;
  }
  setClass = () => {
    console.log(this.layout)
    return this.layout;
  };

  get limitText(): string {
    return this.label.replace('...', `${this.maximum}`);
  }
}
export type sliderElement = 'label'|'value'|'slider';
export type sliderLayoutDirection = 'row' | 'column'