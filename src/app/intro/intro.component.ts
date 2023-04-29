import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { Store } from '@ngrx/store';
import { IPageHeader } from '../core/ipage-header';
import { HeaderProviderService } from '../shared/header/header.provider.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule, MatExpansionModule],
  selector: 'mfmp-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  providers: [
    { provide: HeaderProviderService }
  ]
})
export class IntroComponent implements OnInit {
  store: Store = Inject(Store);
  headerInfo: IPageHeader | undefined;

  constructor( private headerService: HeaderProviderService) {}

  ngOnInit(): void {
    this.headerService.buildPageHeader('intro');
  }
}
