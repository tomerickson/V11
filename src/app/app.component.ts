import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfmpBaseComponent } from './core/mfmp-base-component';
import { HeaderComponent } from './shared/header/header.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuComponent } from './menu/menu.component';

@Component({
  standalone: true,
  selector: 'mfmp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [HeaderComponent, RouterModule, MatSidenavModule, MenuComponent, CommonModule]
})
export class AppComponent extends MfmpBaseComponent {
  title = 'v11';
}
