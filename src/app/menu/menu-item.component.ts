import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
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
export class MenuItemComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log(JSON.stringify(changes));
  }

  @Input({ required: true }) icon!: string;
  @Input({ required: true }) item!: IMenuItem;

  @Output() menuClick: EventEmitter<IMenuItem> = new EventEmitter<IMenuItem>();

  toggleMenu = (): void => {
    this.menuClick.emit(this.item);
  };
}
