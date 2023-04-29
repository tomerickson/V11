import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderProviderService } from '../shared/header/header.provider.service';

@Component({
  selector: 'mfmp-fission',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fission.component.html',
  styleUrls: ['./fission.component.scss'],
  providers: [
        { provide: HeaderProviderService }
  ]
})
export class FissionComponent implements OnInit {

  constructor(private headerService: HeaderProviderService) {}

  ngOnInit(): void {
     this.headerService.buildPageHeader('fission');
  }

}
