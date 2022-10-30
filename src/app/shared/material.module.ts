import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { MatCommonModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';

const materialModules = [
  MatCardModule,
  MatCommonModule,
  MatListModule,
  MatRadioModule,
  MatSidenavModule,
  MatSliderModule,
  MatToolbarModule
];

@NgModule({
  imports: [materialModules],
  exports: [materialModules]
})
export class MaterialModule {
 }
