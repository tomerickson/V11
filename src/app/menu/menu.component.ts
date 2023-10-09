import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from './menu-item.component';
import { MatIconModule } from '@angular/material/icon';
import { CdkAccordionModule } from '@angular/cdk/accordion';

@Component({
  standalone: true,
  selector: 'mfmp-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MenuItemComponent
  ]
})
export class MenuComponent {

  showCascades = false;
  isShowing = true;
  isExpanded = false;
  @ViewChild('cascades') cascades!: ElementRef

  toggleMenu() {
    this.showCascades = !this.showCascades;
    console.log('togglemenu');
  }
}