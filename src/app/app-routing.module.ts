import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FusionComponent } from './fusion/fusion.component';
import { SvgComponent } from './svg/svg.component';

const routes: Routes = [
 // { path: 'svg', loadChildren: () => import('./svg/svg.module').then(m => m.SvgModule) }
  { path: 'svg', component: SvgComponent },
  {path: 'fusion', component: FusionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
