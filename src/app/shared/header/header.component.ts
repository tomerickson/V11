import { Component, Input, OnInit } from '@angular/core';
import {version} from 'package.json';
@Component({
  selector: 'mfmp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() version = '';
   // public version = version;
  constructor() {
    this.version = version;
   }

  ngOnInit(): void {
  }

}
