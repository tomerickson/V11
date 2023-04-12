import { CommonModule } from '@angular/common';
import { compileComponentFromMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MfmpBaseComponent } from '../core/mfmp-base-component';
import { globalFeature } from '../state/global.state';
import { PageActions } from '../state/global.actions';
import { MatExpansionModule} from '@angular/material/expansion'
@Component({
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  selector: 'mfmp-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent extends MfmpBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.pageTitle = this.store.select(globalFeature.selectPageTitle)
    this.pageDescription = this.store.select(globalFeature.selectPageDescription);
    this.store.dispatch(PageActions.setPageTitle({title: 'Introduction'}))
    this.store.dispatch(PageActions.setPageDescription({description: ''}))
  }

}
