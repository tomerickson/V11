import { CommonModule } from '@angular/common';
import { compileComponentFromMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MfmpBaseComponent } from '../core/mfmp-base-component';
@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule],
  selector: 'mfmp-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent extends MfmpBaseComponent implements OnInit {

  constructor() {
    super();
    this.pageDescription = ``;
    this.pageTitle = 'Introduction';
  }

  ngOnInit(): void {
  }

}
