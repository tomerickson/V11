import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from './menu-item.component';
import { MatIconModule } from '@angular/material/icon';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { AppConfigService } from '../../app/core/config/app-config.service';
import { unescapeLeadingUnderscores } from 'typescript';
import { IAppConfig } from '../core/config/iapp-config.model';
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
    MenuItemComponent,
  ],
})
export class MenuComponent {

  readonly appService = inject(AppConfigService);
  config: IAppConfig;
  showCascades = false;
  isShowing = true;
  isExpanded = false;
  @ViewChild('cascades') cascades!: ElementRef

  constructor() {
    this.config = this.appService.config;
  }
  toggleMenu() {
    this.showCascades = !this.showCascades;
    console.log('togglemenu');
  }
}