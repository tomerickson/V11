import { Component, Input, OnInit, inject } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppConfigService } from 'src/app/core/config/app-config.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
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
export class HeaderComponent implements OnInit {

   showMenu!: Observable<boolean>;
   menuTip!: Observable<string>;
   pageTitle!: Observable<string>;
   pageCredits!: Observable<string>;
   pageDescription!: Observable<string>;
   
   @Input() version = '';

  store = inject(Store);
  ready: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(private config: AppConfigService) {
    this.version = config.version;
  }

  ngOnInit(): void {
    this.showMenu = this.store.select(globalFeature.selectShowMenu);
    this.menuTip = this.store.select(globalFeature.selectShowMenuText);
    this.pageTitle = this.store.select(globalFeature.selectPageTitle)
    this.pageCredits = this.store.select(globalFeature.selectPageCredits);
    this.pageDescription = this.store.select(globalFeature.selectPageDescription);
    this.ready.next(true);

  }

  toggleMenu = () => {
    this.store.dispatch(PageActions.toggleMenu());
  };
}
