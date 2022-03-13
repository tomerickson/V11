import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'mfmp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() version = '';
   // public version = version;
  constructor() {
    this.version = environment.version;
   }

  ngOnInit(): void {
  }

}
