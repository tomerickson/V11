import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SvgRoutingModule } from './svg-routing.module';
import { SvgComponent } from './svg.component';


@NgModule({
  declarations: [
    SvgComponent
  ],
  imports: [
    CommonModule,
    SvgRoutingModule
  ],
  exports: [
    SvgComponent
  ]
})
export class SvgModule { }
