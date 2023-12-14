import { CommonModule } from '@angular/common';

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule, MatSliderThumb } from '@angular/material/slider';
import { KeyValuePair } from 'src/app/core/models/key-value-pair.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mfmp-slider-input',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSliderModule],
  templateUrl: './slider-input.component.html',
  styleUrl: './slider-input.component.scss',
  providers: [MatSliderThumb]
})

/**
 * A component that combines a mat-slider, an optional mat-label, and an optional
 * readonly input to display the current value of the slider.
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
@param elements // string containg 's' and optionally 'l' and/or 'v' in the order to be presented
@param label // lalbel
@output
 */
export class SliderInputComponent implements OnInit {
  @Input() minimum = 0;
  @Input({ required: true }) maximum!: number;
  @Input() default = 1;
  @Input() step = 1;
  @Input({ required: true }) controlName!: string;
  @Input() layout: SliderLayout = 'row'; // horizontal or vertical
  // @Input({ required: true }) elements!: string; // label first or value first
  @Input() label!: string; // Ex: Limit results to ... rows.
  @Output() sliderValue: EventEmitter<KeyValuePair> = new EventEmitter();

  get elements(): string {
    return this.form.elements;
  }
  @Input({ required: true }) set elements(value: string) {
    if (this.checkElements(value)) {
      this.parseElements(value);
      this.form.elements = value;
    }
  }

  get value(): number {
    return this.form.value;
  }

  set value(value: number) {
    this.form.value = value;
    this.sliderValue.emit(
      new KeyValuePair({ key: this.controlName, value: value })
    );
  }

  form: { value: number; elements: string };
  fields: string[] = [];

  constructor() {
    this.form = {value: this.default, elements: ''};
  }

  ngOnInit(): void {
    // this.form = { value: this.default };
    // this.parseElements();
  }

  setClass = () => {
    return this.layout;
  };

  checkElements = (elements: string): boolean => {
    let err = '';
    let vlu = elements.slice();
    let rex = vlu.match('[slv]');
    let ok = vlu.indexOf('s') >= 0;

    console.log('elements:', elements);
    console.log('rex:', rex);
    if (ok) {
      for (let i = 0; i < vlu.length; i++) {
        switch (vlu[i]) {
          case 's':
            break;
          case 'v':
            break;
          case 'l':
            break;
          default:
            ok = false;
            err = `${vlu[i]} is not a recognized slider element.  Use only 'l', 's' or 'v'`;
            break;
        }
      }
    } else {
      err = `'elements' must contain an 's'.`;
    }
    if (!ok) console.log(err);
    return ok;
  };

  parseElements = (elements: string): void => {
    let err = '';
    let vlu = elements.slice();

    for (let i = 0; i < vlu.length; i++) {
      switch (vlu[i]) {
        case 's':
          this.fields.push('slider');
          break;
        case 'v':
          this.fields.push('value');
          break;
        case 'l':
          this.fields.push('label');
          break;
      }
    }
  };

  get limitText(): string {
    return this.label.replace('...', `${this.maximum}`);
  }
}
export type SliderLayout = 'row' | 'column';
