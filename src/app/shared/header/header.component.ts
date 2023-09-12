import { AsyncPipe } from '@angular/common';
import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { actions } from 'src/app/state/global.actions';
import { feature } from 'src/app/state/global.state';
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
   version!: Observable<string>;
   
  store = inject(Store);
  ready: BehaviorSubject<boolean> = new BehaviorSubject(false);



  ngOnInit(): void {
    this.showMenu = this.store.select(feature.selectShowMenu);
    this.menuTip = this.store.select(feature.selectShowMenuText);
    this.pageTitle = this.store.select(feature.selectPageTitle)
    this.pageDescription = this.store.select(feature.selectPageDescription);
    this.pageCredits = this.store.select(feature.selectPageCredits);
    this.version = this.store.select(feature.selectVersion);
    this.ready.next(true);

  }

  toggleMenu = () => {
    this.store.dispatch(actions.toggleMenu());
  };
}
