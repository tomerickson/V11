import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'mfmp-spin-picker',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatInputModule,
  ],
  templateUrl: './spin-picker.component.html',
  styleUrls: ['./spin-picker.component.scss']
})
export class SpinPickerComponent implements OnInit {

  @Input() title = '';
  @Input() role!: string;
  @Input() formGroupName = ''

  form!: FormGroup;

  constructor(private fb: FormBuilder, private fgd: FormGroupDirective) {}
  
  ngOnInit(): void {
    this.form = this.fgd.control.get(this.formGroupName) as FormGroup;
  }

  viewProviders: [
    { provide: ControlContainer; useExisting: FormGroupDirective; }
  ] | undefined

}
