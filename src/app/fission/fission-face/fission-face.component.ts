import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'mfmp-fission-face',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatExpansionModule],
  templateUrl: './fission-face.component.html',
  styleUrls: ['./fission-face.component.scss'],
  viewProviders: [MatExpansionPanel]
})
export class FissionFaceComponent {

    description = 'Fetch from state';
}
