import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
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
  imports: [HttpClientModule,
    MatToolbarModule,
    MatCommonModule,
    MatListModule,
    MatSidenavModule,
    MatSliderModule,
  MatToolbarModule],
  exports: [
    MatCommonModule,
    MatListModule,
    MatSidenavModule,
    MatSliderModule,
    MatToolbarModule,
    HeaderComponent
  ]
})
export class SharedModule { }
