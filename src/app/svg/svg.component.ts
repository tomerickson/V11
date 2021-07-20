import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg',
  template: `
      <img src="/assets/images/svgs/{{type}}.svg" [alt]="type + ' icon'" [title]="title">`,
  styleUrls: [
  './svg.component.scss'
   ]
})
export class SvgComponent  {
  @Input() type: string | undefined;
  @Input() title: string | undefined;
}
