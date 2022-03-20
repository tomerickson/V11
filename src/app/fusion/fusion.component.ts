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
    this.pageTitle = ('Fusion Reactions');
    this.pageDescription = (`This program ("Fusion.php") enables SQL commands to query the Fusion tables originally created from Dr Parkhomov's spreadsheets.`);
  }

  ngOnInit(): void {
  }

  execute_query() {}
}
