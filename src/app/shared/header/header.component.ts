import { Component, Input, OnInit, inject } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MfmpBaseComponent } from 'src/app/core/mfmp-base-component';
import { AppConfigService } from 'src/app/core/config/app-config.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { globalFeature } from 'src/app/state/global.state';
import { PageActions } from 'src/app/state/global.actions';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'mfmp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatCommonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ]
})
export class HeaderComponent extends MfmpBaseComponent implements OnInit {

   showMenu!: Observable<boolean>;
   menuTip!: Observable<string>;
  @Input() version = '';

  store = inject(Store);

  constructor(private config: AppConfigService) {
    super();
    this.version = config.version;
  }

  ngOnInit(): void {
    this.showMenu = this.store.select(globalFeature.selectShowMenu);
    this.menuTip = this.store.select(globalFeature.selectShowMenuText);
    this.pageTitle = this.store.select(globalFeature.selectPageTitle)
    this.pageCredits = this.store.select(globalFeature.selectPageCredits);

  }

  toggleMenu = () => {
    this.store.dispatch(PageActions.toggleMenu());
  };
}
