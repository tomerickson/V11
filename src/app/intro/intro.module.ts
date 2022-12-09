import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { IntroComponent } from './intro.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: IntroComponent},
]

@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class IntroModule { }
