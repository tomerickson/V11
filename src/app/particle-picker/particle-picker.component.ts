import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
@Component({
  selector: 'mfmp-particle-picker',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule],
  template: `<mat-card>
    <mat-card-content>
      <mat-grid-list cols="2" rowHeight="8:1">
        <mat-grid-tile-header>
          Particle Picker
          <mat-grid-tile> Atomic </mat-grid-tile>
          <mat-grid-tile> Nuclear </mat-grid-tile>
        </mat-grid-tile-header>
        <mat-grid-tile> Fermionic </mat-grid-tile>
        <mat-grid-tile> Bosonic</mat-grid-tile>
      </mat-grid-list>
    </mat-card-content>
  </mat-card>`,
  styles: [``]
})
export class ParticlePickerComponent {}
