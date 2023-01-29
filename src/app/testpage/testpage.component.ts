import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { from, Observable, Subscription } from 'rxjs';
import { CrudService } from '../core/crud.service';
import { MfmpBaseComponent } from '../core/mfmp-base-component';

@Component({
  selector: 'mfmp-testpage',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `<ul>
    <li>
      <div>{{testResults | async}}</div>
    </li>
    <li>
      <button mat-raised-button (click)="testIt()">Trigger Test</button>
    </li>
  </ul>`,
  styleUrls: ['testpage.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TestpageComponent
  extends MfmpBaseComponent
  implements OnInit, OnDestroy
{
  private refresher: Subscription = new Subscription();
  testResults: Observable<ArrayBuffer>

  constructor(private crudService: CrudService) {
    super();
    this.testResults = from([]);
  }

  ngOnInit(): void {

  }
  
  ngOnDestroy(): void {
    this.refresher.unsubscribe();
  }

  reload() {
    this.crudService.getFusionResults().pipe(res => this.testResults = res);
    this.refresher.unsubscribe();
  }
  testIt(): void {
    console.log('testing');
    this.reload();
  }
}
