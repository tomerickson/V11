import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ILenrEventDetail } from 'src/app/core/models/lenr-event-detail.model';

@Component({
  selector: 'mfmp-lenr-events-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './lenr-events-detail.component.html',
  styleUrls: ['./lenr-events-detail.component.scss']
})
export class LenrEventsDetailComponent {
  @Input({ required: true }) event!: ILenrEventDetail | null;
  @Output() next: EventEmitter<any> = new EventEmitter();
  @Output() prior: EventEmitter<any> = new EventEmitter();
  @Output() back: EventEmitter<any> = new EventEmitter();

  goBack = () => {
    this.back.emit();
  }
  goPrior = () => {
    this.prior.emit();
  }
  goNext = () => {
    this.next.emit();
  }
}
