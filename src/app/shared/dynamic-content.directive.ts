import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[mfmpContent]',
  standalone: true
})
export class DynamicContentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }
 }
