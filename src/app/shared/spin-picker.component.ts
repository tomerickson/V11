import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'mfmp-spin-picker',
  standalone: true,
  imports: [
    CommonModule,
    MatRadioModule,
    MatSlideToggleModule
  ],
  template: `
    <div class="flexrow">
      <div class="flexcolumn center">
        Atomic
        <div class="flexcolumn">
          <mat-slide-toggle checked="true">Boson</mat-slide-toggle>
          <mat-slide-toggle checked="true">Fermion</mat-slide-toggle>
        </div>
      </div>
      <div class="flexcolumn center">
        Nuclear
        <div class="flexcolumn">
          <mat-slide-toggle checked="true">Boson</mat-slide-toggle>
          <mat-slide-toggle checked="true">Fermion</mat-slide-toggle>
        </div>
      </div>
    </div>
  `,
  styles: [
    `div.center {
      text-align: center;
    }
      div.flexrow {
        display: flex;
        flex-direction: row;
        flex: 1 1;
      }
      div.flexcolumn {
        display: flex;
        flex-direction: column;
        flex: 1 1;
      }
    `
  ]
})
export class SpinPickerComponent {}
