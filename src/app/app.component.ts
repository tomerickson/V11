import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfmpBaseComponent } from './core/mfmp-base-component';
import { HeaderComponent } from './shared/header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuComponent } from './menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { globalFeature, selectShowMenu } from './state/global.state';

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
export class AppComponent extends MfmpBaseComponent implements OnInit {
  title = 'v11';
  store = inject(Store);
  showMenu?: Observable<boolean>;

  ngOnInit(): void {
    this.showMenu = this.store.select(globalFeature.selectShowMenu)
  }

}
