import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'mfmp-numeric-input',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    ReactiveFormsModule
  ],
  templateUrl: './numeric-input.component.html',
  styleUrls: ['./numeric-input.component.scss']
})
export class NumericInputComponent implements OnInit  {

  private _method!: 'slider' | 'text';

  @Input() min = 0;
  @Input() max: number = -1;
  @Input() step = 1;
  @Input() label = '';
  @Input() inputId = '';
  @Input({required: true, transform: () => FormControl}) control!:  FormControl;
  @Input({ required: true }) errorMessages!: Record<string, string>;

  ngOnInit(): void {
  }

  hasError = (errorName: string) => {
    return this.control.hasError(errorName);
  };
}
