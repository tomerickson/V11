import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  exports: [CommonModule, MaterialModule, HeaderComponent],
  declarations: [HeaderComponent]
})
export class SharedModule {}
