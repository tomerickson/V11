import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { RouterLinkWithHref, RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuComponent } from './menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { feature } from './state/global.state';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLinkWithHref,
    RouterOutlet, MatSidenavModule, MatToolbarModule,HeaderComponent, MenuComponent],
  selector: 'mfmp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'v11';
  store = inject(Store);
  showMenu?: Observable<boolean>;

  ngOnInit(): void {
    this.showMenu = this.store.select(feature.selectShowMenu)
  }

}
