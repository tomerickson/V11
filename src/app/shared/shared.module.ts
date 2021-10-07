import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatListModule} from '@angular/material/list';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatSidenavModule,
    MatSliderModule,
    MatToolbarModule
  ],
  exports: [
    MatListModule,
    MatSidenavModule,
    MatSliderModule,
    MatToolbarModule
  ]
})
export class SharedModule { }
