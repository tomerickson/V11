import { Component, OnInit } from '@angular/core';
import { version } from 'package.json'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public version: string = version;
  constructor() { }

  ngOnInit(): void {
  }

}
