import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LenrEventsFaceComponent } from './lenr-event-face/lenr-events-face.component';

@Component({
  selector: 'mfmp-lenr-events-head',
  standalone: true,
  imports: [CommonModule, LenrEventsFaceComponent],
  template: `
    <mfmp-lenr-events-face [request]="request"></mfmp-lenr-events-face>
  `,
  styles: []
})
export class LenrEventsHeadComponent {
  
  request: EventRequest = {} as EventRequest;
}

export interface EventRequest {
  s_Year_from: number;
  s_Year_to: number;
  s_Index_from: number;
  s_Index_to: number;
  s_Category: string;
  s_Author: string;
  s_Title: string;
  s_Keywords: string[];
}
