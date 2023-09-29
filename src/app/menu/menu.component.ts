import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { IMenuItem } from '../core/models/menu-item';
import appMenuJson from './app.menu.json';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'mfmp-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss'],
  imports: [CommonModule, RouterModule, MatSidenavModule, MatListModule]
})
export class MenuComponent implements OnInit {
  menus: IMenuItem[] = [];
  showMenu!: Observable<boolean>;

  ngOnInit(): void {
    this.menus = appMenuJson.map((row) => {
      return {
        route: row.route,
        icon: row.icon,
        text: row.text,
        link: row.link
      };
    });
    console.log(JSON.stringify(this.menus))
  }
}
