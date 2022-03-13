import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MatListModule} from '@angular/material/list';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [HttpClientModule, MatToolbarModule],
  exports: [
    MatListModule,
    MatSidenavModule,
    MatSliderModule,
    MatToolbarModule,
    HeaderComponent
  ]
})
export class SharedModule { }
