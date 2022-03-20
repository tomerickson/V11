import { Component, OnInit } from '@angular/core';
import { MfmpBaseComponent } from '../core/mfmp-base-component';
@Component({
  selector: 'mfmp-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent extends MfmpBaseComponent implements OnInit {

  constructor() {
    super();
    this.pageDescription = ``;
    this.pageTitle = 'Introduction';
  }

  ngOnInit(): void {
  }

}
