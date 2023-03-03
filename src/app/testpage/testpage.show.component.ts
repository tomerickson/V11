import { CommonModule, NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
  MatTableModule
} from '@angular/material/table';
import { IElementDataModel } from '../core/element.data.model';
import { MfmpBaseComponent } from '../core/mfmp-base-component';

@Component({
  imports: [
    CommonModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    NgFor
  ],
  selector: 'mfmp-testpage',
  standalone: true,

  template: `<ul>
      <li>
        <!--<div><p [innerHTML]="toHTML(test)"></p></div>-->
        <textarea>{{ test }}</textarea>
      </li>
      <li>
        <div>
          <p>{{ demo | json }}</p>
        </div>
      </li>
    </ul>
    <ng-container *ngIf="elements; else emptyElements">
      <ul>
        <table mat-table [dataSource]="elements">
          <!--
export interface IElementDataModel {

  AWeight: number;
  ARadius: number;
  MolarVolume: number;
  Melting: number;
  Boiling: number;
  Negativity: number;
  Affinity: number;
  Valence: number;
  MaxIonNum: number;
  ElectConduct: number;
  STPDensity: number;
  ElectConduct: number;
  ThermConduct: number;
  SpecHeat: number;
}-->
          <ng-container matColumnDef="Z">
            <th mat-header-cell *matHeaderCellDef>Z</th>
            <td mat-cell *matCellDef="let element">{{ element.Z }}</td>
          </ng-container>
          <ng-container matColumnDef="E">
            <th mat-header-cell *matHeaderCellDef>E</th>
            <td mat-cell *matCellDef="let element">{{ element.E }}</td>
          </ng-container>
          <ng-container matColumnDef="EName">
            <th mat-header-cell *matHeaderCellDef>EName</th>
            <td mat-cell *matCellDef="let element">{{ element.EName }}</td>
          </ng-container>
          <ng-container matColumnDef="P">
            <th mat-header-cell *matHeaderCellDef>P</th>
            <td mat-cell *matCellDef="let element">{{ element.P }}</td>
          </ng-container>
          <ng-container matColumnDef="G">
            <th mat-header-cell *matHeaderCellDef>G</th>
            <td mat-cell *matCellDef="let element">{{ element.G }}</td>
          </ng-container>
          <ng-container matColumnDef="AWeight">
            <th mat-header-cell *matHeaderCellDef>AWeight</th>
            <td mat-cell *matCellDef="let element">{{ element.AWeight }}</td>
          </ng-container>
          <ng-container matColumnDef="ARadius">
            <th mat-header-cell *matHeaderCellDef>ARadius</th>
            <td mat-cell *matCellDef="let element">{{ element.ARadius }}</td>
          </ng-container>
          <ng-container matColumnDef="MolarVol">
            <th mat-header-cell *matHeaderCellDef>MolarVol</th>
            <td mat-cell *matCellDef="let element">
              {{ element.MolarVol }}
            </td>
          </ng-container>
          <ng-container matColumnDef="Melting">
            <th mat-header-cell *matHeaderCellDef>Melting</th>
            <td mat-cell *matCellDef="let element">{{ element.Melting }}</td>
          </ng-container>
          <ng-container matColumnDef="Boiling">
            <th mat-header-cell *matHeaderCellDef>Boiling</th>
            <td mat-cell *matCellDef="let element">{{ element.Boiling }}</td>
          </ng-container>
          <ng-container matColumnDef="Negativity">
            <th mat-header-cell *matHeaderCellDef>Negativity</th>
            <td mat-cell *matCellDef="let element">{{ element.Negativity }}</td>
          </ng-container>
          <ng-container matColumnDef="Affinity">
            <th mat-header-cell *matHeaderCellDef>Affinity</th>
            <td mat-cell *matCellDef="let element">{{ element.Affinity }}</td>
          </ng-container>
          <ng-container matColumnDef="Val">
            <th mat-header-cell *matHeaderCellDef>Valence</th>
            <td mat-cell *matCellDef="let element">{{ element.Val }}</td>
          </ng-container>
          <ng-container matColumnDef="MxInum">
            <th mat-header-cell *matHeaderCellDef>MxInum</th>
            <td mat-cell *matCellDef="let element">{{ element.MxInum }}</td>
          </ng-container>
          <ng-container matColumnDef="MxInize">
            <th mat-header-cell *matHeaderCellDef>MxInize</th>
            <td mat-cell *matCellDef="let element">
              {{ element.MaxIonization }}
            </td>
          </ng-container>
          <ng-container matColumnDef="STPDensity">
            <th mat-header-cell *matHeaderCellDef>STPDensity</th>
            <td mat-cell *matCellDef="let element">{{ element.STPDensity }}</td>
          </ng-container>
          <ng-container matColumnDef="ElectG">
            <th mat-header-cell *matHeaderCellDef>ElectG</th>
            <td mat-cell *matCellDef="let element">
              {{ element.ElectG }}
            </td>
          </ng-container>
          <!--
          <ng-container matColumnDef="ElectConduct">
            <th mat-header-cell *matHeaderCellDef>ElectConduct</th>
            <td mat-cell *matCellDef="let element">
              {{ element.ElectConduct }}
            </td>
          </ng-container>
-->
          <ng-container matColumnDef="ThermG">
            <th mat-header-cell *matHeaderCellDef>ThermG</th>
            <td mat-cell *matCellDef="let element">
              {{ element.ThermG }}
            </td>
          </ng-container>
          <ng-container matColumnDef="SpecHeat">
            <th mat-header-cell *matHeaderCellDef>SpecHeat</th>
            <td mat-cell *matCellDef="let element">{{ element.SpecHeat }}</td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="columnsToDisplay"></tr>
          <tr mat-row *matRowDef="let element; columns: columnsToDisplay"></tr>
        </table>
      </ul>
    </ng-container>
    <ng-template #emptyElements>
      <h3>No elements to show</h3>
    </ng-template>
    <ul>
      <li>
        <button mat-raised-button (click)="loadElements()">
          Load Elements
        </button>
      </li>
      <li>
        <button mat-raised-button (click)="testFusion()">Trigger Test</button>
      </li>
      <li>
        <button mat-raised-button (click)="testDummy()">Trigger Demo</button>
      </li>
    </ul>`,
  styleUrls: ['testpage.component.scss']
})
export class TestpageShowComponent
  extends MfmpBaseComponent
  implements OnInit, OnDestroy
{
  @Input() test: any;
  @Input() demo: string | null;
  @Input() elements: IElementDataModel[] | null;
  @Output() testit: EventEmitter<string> = new EventEmitter();
  @Output() demoit: EventEmitter<string> = new EventEmitter();
  @Output() getElements: EventEmitter<string> = new EventEmitter();

  dataSource: MatTableDataSource<IElementDataModel[]> | undefined;
  columnsToDisplay = [
    'Z',
    'E',
    'EName',
    'P',
    'G',
    'AWeight',
    'ARadius',
    'MolarVol',
    'Melting',
    'Boiling',
    'Negativity',
    'Affinity',
    'Val',
    'MxInum',
    'MxInize',
    'STPDensity',
    'ElectG',
    'ThermG',
    'SpecHeat'
  ];

  constructor() {
    super();
    this.demo = null;
    this.elements = [];
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // this.refresher.unsubscribe();
  }

  loadElements() {
    this.getElements.emit('');
  }

  testFusion() {
    this.testit.emit('');
  }

  testDummy() {
    this.demoit.emit('');
  }

  toHTML(input: string): any {
    return new DOMParser().parseFromString(input, 'text/html').body.textContent;
  }
}
