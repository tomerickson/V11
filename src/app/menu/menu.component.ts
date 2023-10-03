import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { IMenuItem } from '../core/models/menu-item';
import appMenuJson from './app.menu.json';
import { MenuItemComponent } from './menu-item.component';
import { AppConfigService } from '../core/config/app-config.service';

@Component({
  standalone: true,
  selector: 'mfmp-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MenuItemComponent
  ]
})

export class MenuComponent implements OnInit {
  config = inject(AppConfigService);

  menus: IMenuItem[] = [];
  icon = 'chevron_right';
  showMenu!: Observable<boolean>;
  @ViewChild('menuOutlet') menuOutlet!: ElementRef;

  ngOnInit(): void {
    this.initializeMenus();
  }

  initializeMenus = () => {
    this.menus = appMenuJson as IMenuItem[];
    this.menus.forEach(menu => {
      menu.show = (menu.parent) ? false: true;
      if (menu.link) {
        menu.link = this.config.apiUrl + menu.link;
      }
    })
  };

  clickHandler(e: IMenuItem) {
    this.menus.forEach(item => {
      if (item.parent === e.id) {
        item.show = !item.show;
      }
      if (item.id === e.id) {
        item.expanded = (item.expanded) ? false : true;
        this.icon = (item.expanded) ? 'expand_more' : 'chevron_right';
      }
    })
  }
}
