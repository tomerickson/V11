import { Component } from '@angular/core';
import { MfmpBaseComponent } from './core/mfmp-base-component';

@Component({
  selector: 'mfmp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends MfmpBaseComponent {
  title = 'v11';
}
