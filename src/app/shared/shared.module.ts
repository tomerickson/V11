import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

import { MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule
  ]
})
export class SharedModule { }
