import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { FissionFaceComponent } from './fission-face/fission-face.component';

@Component({
  selector: 'mfmp-fission-head',
  standalone: true,
  imports: [
    CommonModule,

  FissionFaceComponent],
  template: `<mfmp-fission-face></mfmp-fission-face>`,
  styles: [''],
  providers: [
        { provide: HeaderProviderService }
  ]
})
export class FissionHeadComponent implements OnInit {

  constructor(private headerService: HeaderProviderService) {}

  ngOnInit(): void {
     this.headerService.buildPageHeader('fission');
  }

}
