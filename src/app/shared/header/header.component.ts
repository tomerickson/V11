import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatCommonModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MfmpBaseComponent } from 'src/app/core/mfmp-base-component';
@Component({
  selector: 'mfmp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MatCommonModule, MatToolbarModule, MatSidenavModule, MatListModule]
})

export class HeaderComponent extends MfmpBaseComponent implements OnInit {

  @Input() version = '';
   // public version = version;
  constructor() {
    super();
    this.version = environment.version;
   }

  ngOnInit(): void {
  }

}
