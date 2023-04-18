import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { Observable, from } from 'rxjs';
import { IElementDataModel } from '../core/element.data.model';
import { MfmpBaseComponent } from '../core/mfmp-base-component';
import { globalFeature } from '../state/global.state';
import { SpinPickerComponent } from './spin-picker.component';

@Component({
  selector: 'mfmp-particle-picker',
  standalone: true,
  template: `
    <mat-card>
      <mat-card-header>Particle Picker</mat-card-header>
      <mat-card-content>
        <form-field formControlName="" appearance="fill">
          <mat-label>Elements</mat-label>
          <mat-select placeholder="Elements" multiple>
            <mat-option
              *ngFor="let element of elements | async"
              [value]="element.E">
              {{ element.E }} - {{ element.EName }}
            </mat-option>
          </mat-select>
        </form-field>
        <mfmp-spin-picker></mfmp-spin-picker>
      </mat-card-content>
    </mat-card>
  `,
  styles: [``],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    SpinPickerComponent
  ]
})
export class ParticlePickerComponent extends MfmpBaseComponent {
  @Input() hostForm: FormGroup | undefined;
  @Input() controlName: string = '';
  elements: Observable<IElementDataModel[]> = from([]);
  element: string = '';
  constructor() {
    super();
  }

  ngOnInit() {
    this.elements = this.store.select(globalFeature.selectElements);
  }
}
