import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { MatCommonModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
const materialModules = [
  MatCardModule,
  MatCommonModule,
  MatListModule,
  MatRadioModule,
  MatSidenavModule,
  MatSliderModule,
  MatToolbarModule
];

const ngrxModules: [] = [];

const allModules = materialModules.concat(CommonModule).concat(ngrxModules)

@NgModule({

  imports: [allModules],
  exports: [allModules, HeaderComponent],
  declarations: [HeaderComponent]

})
export class SharedModule {
 }
