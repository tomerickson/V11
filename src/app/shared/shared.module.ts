
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatCommonModule,
    MatListModule,
    MatSidenavModule,
    MatSliderModule,
  MatToolbarModule],
  exports: [
    MatButtonModule,
    MatCommonModule,
    MatListModule,
    MatSidenavModule,
    MatSliderModule,
    MatToolbarModule,
    HeaderComponent
  ]
})
export class SharedModule { }
