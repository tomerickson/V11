import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'mfmp-page-not-found',
  template: `
    <h2>Page Not Found</h2>`,
  styles: [`h2: {color: red;}`]
})
export class PageNotFoundComponent {
}
