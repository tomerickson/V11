import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfmpBaseComponent } from './core/mfmp-base-component';
import { HeaderComponent } from './shared/header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuComponent } from './menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet, MatSidenavModule, MatToolbarModule,HeaderComponent, MenuComponent],
  selector: 'mfmp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends MfmpBaseComponent {
  title = 'v11';
}
