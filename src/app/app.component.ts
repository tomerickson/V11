import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mfmp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'v11';

  constructor(private router: Router) { }

  showCircle = () => {
    this.router.navigate(['svg'], { queryParams: { type: 'circle', title: 'Circle' } });
  }

  showFusion = () => {
    this.router.navigate(['fusion']);
  }
}
