import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'mfmp-spin-picker',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './spin-picker.component.html',
  styleUrls: ['./spin-picker.component.scss']
})
export class SpinPickerComponent {

  @Input() title: string | undefined;
  @Input() role: string | undefined;
  @Input() formGroupName!: string;
  @Input() form!: FormGroup;
}
