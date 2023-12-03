import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'mfmp-slider-input',
  standalone: true,
  imports: [CommonModule, MatSliderModule, ReactiveFormsModule],
  templateUrl: './slider-input.component.html',
  styleUrl: './slider-input.component.scss'
})
export class SliderInputComponent implements OnInit {

  @Input() min = -1;
  @Input() max = -1;
  @Input() step = 1;
  @Input() inputId = '';
  @Input() label = '';
  @Input({required: true, transform: () => FormControl}) control!:  FormControl;
  @Input() errorMessages!: Record<string, string>

  ngOnInit(): void {
  }

}
