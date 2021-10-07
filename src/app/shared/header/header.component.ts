import { Component, OnInit } from '@angular/core';
import version from 'package.json'
@Component({
  selector: 'mfmp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

   public version = version;
  constructor() { }

  ngOnInit(): void {
  }

}
