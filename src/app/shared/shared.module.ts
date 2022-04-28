import { NgModule } from '@angular/core';
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

const allModules = materialModules.concat(ngrxModules)

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [allModules],
  exports: [allModules, HeaderComponent]

})
export class SharedModule { }
