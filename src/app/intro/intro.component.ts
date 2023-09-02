import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { Store } from '@ngrx/store';
import { IPageHeader } from '../core/ipage-header';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { AppConfigService } from '../core/config/app-config.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule, MatExpansionModule, RouterModule],
  selector: 'mfmp-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  providers: [
    { provide: HeaderProviderService }
  ]
})
export class IntroComponent implements OnInit {

  readonly apiUrl!: string;
  store = inject(Store);
  config = inject(AppConfigService);
  headerInfo: IPageHeader | undefined;

  constructor( private headerService: HeaderProviderService) {
    this.apiUrl = this.config.apiUrl;
  }

  ngOnInit(): void {
    this.headerService.buildPageHeader('intro');
  }
}
