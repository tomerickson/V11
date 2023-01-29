import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
@Component({
  standalone: true,
  selector: 'mfmp-menu',
  template: `<ul matNavList>
     <a mat-list-item routerLink="intro">Introduction</a>
     <a mat-list-item routerLink="fusion">Fusion Reactions</a>
     <a mat-list-item routerLink="fission">Fission Reactions</a>
     <a mat-list-item routerLink="twototwo">Two to Two Reactions</a>
     <a mat-list-item routerLink="alltables">All Tables</a>
     <a mat-list-item routerLink="cascadesall">Cascades All</a>
     <a mat-list-item routerLink="cascades4">Cascades 4</a>
     <a mat-list-item routerLink="cascades5lite">Cascades 5 Lite</a>
     <a mat-list-item routerLink="cascades5">Cascades 5</a>
     <a mat-list-item routerLink="listresults">All Results</a>
     <a mat-list-item routerLink="showelementdata">Show Element Data</a>
     <a mat-list-item routerLink="tablesindetail">Tables in Detail</a>
     <a mat-list-item routerLink="downloads">Downloads</a>
     <a mat-list-item routerLink="notes">Notes</a>
     <a mat-list-item href="https://www.nanosoft.co.nz/TheNanosoftPackage.pdf" target="_blank" rel="noopener noreferrer">Overview</a>
     <a mat-list-item routerLink="selectlenrevents">Select LENR Events</a>
     <a mat-list-item routerLink="testpage">Test Page</a>
</ul>`,
   styles: [`
   .mat-list-item {
    height: 36px !important;
  }`],
  imports: [CommonModule, RouterModule, MatSidenavModule, MatListModule]
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
