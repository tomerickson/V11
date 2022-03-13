import { Component, OnInit } from '@angular/core';
import { MfmpBaseComponent } from '../core/mfmp-base-component';

@Component({
  selector: 'mfmp-fusion',
  templateUrl: './fusion.component.html',
  styleUrls: ['./fusion.component.scss']
})
export class FusionComponent extends MfmpBaseComponent implements OnInit {

  constructor() {

    super();
    this.pageTitle.next('Fusion Reactions');
  }

  ngOnInit(): void {
  }

  execute_query() {}
}
