import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ILenrEventDetail } from 'src/app/core/models/lenr-event-detail.model';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'mfmp-lenr-events-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule],
  templateUrl: './lenr-events-detail.component.html',
  styleUrls: ['./lenr-events-detail.component.scss']
})
export class LenrEventsDetailComponent {
  event!: ILenrEventDetail;

  constructor() {
    const strings = ['a', 'b'];
    this.event = {} as ILenrEventDetail;
    this.event.year = 2000;
    this.event.category = 'category';
    this.event.author = 'author';
    this.event.title = 'title';
    this.event.journal = 'journal';
    this.event.editor = 'editor';
    this.event.pubisher = 'pubisher';
    this.event.city = 'city';
    this.event.date = new Date();
    this.event.comment = 'comment';
    this.event.keywords = strings;
    this.event.abstract = 'abstract';
    this.event.citations = strings;
    this.event.headline = 'headline';
  }
}
