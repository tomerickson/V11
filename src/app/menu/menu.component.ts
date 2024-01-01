import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  inject,
  signal
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { AppConfigService } from '../../app/core/config/app-config.service';
import { IAppConfig } from '../core/config/iapp-config.model';
import { MenuItemComponent } from './menu-item.component';
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
export class MenuComponent implements AfterViewInit {
  readonly appService = inject(AppConfigService);
  config: IAppConfig;
  showCascades = signal(false);
  isShowing = true;
  isExpanded = false;
  @ViewChild('cascades') cascades!: ElementRef<HTMLDivElement>;

  constructor() {
    this.config = this.appService.config;
  }

  ngAfterViewInit(): void {
    console.log(this.cascades);
  }

  toggleMenu(event: Event | false) {
    let cascadesList = this.cascades.nativeElement;
    let show = this.showCascades();
    let visible = !cascadesList.classList.contains('collapse');

    if (event instanceof Event) {
      // Toggle cascades visibility
      this.showCascades.set(!this.showCascades());
      event.stopPropagation();
    } else {
      // Hide cascades
      this.showCascades.set(false);
    }

    if (this.showCascades() != show )
      if (this.showCascades()) {
        cascadesList.classList.remove('collapse');
      } else {
        cascadesList.classList.add('collapse');
      }
    }

  restoreMenu() {
    console.log(this.cascades);
    this.showCascades.set(false);
  }
}
