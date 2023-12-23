import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule, MatSliderThumb } from '@angular/material/slider';
import { SliderInputFields } from '.';

@Component({
  selector: 'mfmp-slider-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule
  ],
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
@param parentForm // formgroup provided by parent form
@param minimum // minimum value accepted by the slider
@param maximum // maximum value accepted by the slider;
@param default // default value of the slider
@param step // slider increment step
@param controlName // The name of the parent control
@param layout // 'column' or 'row'
@param elements // string containg 's' and optionally 'l' and/or 'v' in the order to be presented
@param label // lalbel
 */
export class SliderInputComponent implements OnInit {

  value!: number;
  _elements!: string;
  _controlName!: string;

  fields!: SliderInputFields[];

  @Input({ required: true }) parentForm!: FormGroup;
  @Input() minimum = 0;
  @Input({ required: true }) maximum!: number;
  @Input() step = 1;
  @Input() layout: SliderLayout = 'row'; // horizontal or vertical
  @Input() label = ''; // Ex: Limit results to ... rows.

  @Input({required: true}) set controlName(name: string) {
    this._controlName = name;
    this.value = this.parentForm.controls[name].value;
  }
  get controlName(): string {
    return this._controlName;
  }

  @Input({ required: true }) set elements(value: string) {
    if (this.checkElements(value)) {
      this._elements = value;
      this.fields = [];
      this.parseElements(value);
    }
  }
  get elements(): string {
    return this._elements;
  }

  ready = signal(false);

  constructor() {
   }

  ngOnInit(): void {
    this.ready.set(true);
    console.log('slider-input is ready');
  }

  setClass = () => {
    return this.layout;
  };

  handleSliderChange(event: Event): any {
    // const elm: HTMLInputElement = event.target;
    // console.log(elm);
  }

  checkElements = (elements: string): boolean => {
    let err = '';
    let vlu = elements.slice();
    let ok = vlu.indexOf('s') >= 0;

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
