import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'mfmp-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss'],
  imports: [CommonModule, RouterModule, MatSidenavModule, MatListModule]
})
export class MenuComponent {

  store = inject(Store)
  showMenu?: Observable<boolean>;
}
