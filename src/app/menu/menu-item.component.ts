import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { IMenuItem } from '../core/models/menu-item';

@Component({
  selector: 'mfmp-menu-item',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterModule
  ],
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) item!: IMenuItem;
  @Output() menuClick: EventEmitter<IMenuItem> = new EventEmitter<IMenuItem>();

  get menuType(): 'route' | 'link' | 'menu' {
    const route: boolean = this.item.route.length > 0;
    const link: boolean = (this.item.link ?? '').length > 0;
    const menu: boolean = !route && !link;
    return menu ? 'menu' : link ? 'link' : 'route';
  }

  toggleMenu = (): void => {
    this.menuClick.emit(this.item);
  };
}
