import { Component, Input, OnInit } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MfmpBaseComponent } from 'src/app/core/mfmp-base-component';
import { AppConfigService } from 'src/app/core/config/app-config.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'mfmp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatCommonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ]
})
export class HeaderComponent extends MfmpBaseComponent {
  @Input() version = '';
  // public version = version;
  constructor(private config: AppConfigService) {
    super();
    this.version = config.version;
  }
}
