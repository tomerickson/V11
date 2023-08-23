import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HtmlDirective } from '../shared/html.directive';

@Component({
  selector: 'mfmp-tables-in-detail-face',
  standalone: true,
  imports: [CommonModule, HtmlDirective, MatCardModule],
  templateUrl: './tables-in-detail-face.component.html',
  styleUrls: ['./tables-in-detail-face.component.scss']
})
export class TablesInDetailFaceComponent {

  private _html!: string | null;

  @Input({required: true}) set html(value: string | null) {
    this._html = value;
  }

  get html(): string {
    return (this._html) ? this._html : '';
  }

}
