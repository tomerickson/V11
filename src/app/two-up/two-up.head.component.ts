import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwoUpFaceComponent } from './two-up-face/two-up-face.component';

@Component({
  selector: 'mfmp-two-up',
  standalone: true,
  imports: [CommonModule, TwoUpFaceComponent],
  template: `<mfmp-two-up-face></mfmp-two-up-face>`,
  styleUrls: []
})
export class TwoUpHeadComponent {

}
