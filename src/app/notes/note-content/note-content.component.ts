import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlDirective } from 'src/app/shared/html.directive';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'mfmp-note-content',
  standalone: true,
  imports: [CommonModule, HtmlDirective, MatCardModule],
  templateUrl: './note-content.component.html',
  styleUrls: ['./note-content.component.scss']
})
export class NotesFaceComponent implements OnInit {

private _html: string| null = '';

  @Input({required: true}) set html(value: string | null) {
    this._html = value;
  }

  get html(): string {
    return (this._html) ? this._html : '';
  }

  ngOnInit(): void {
    console.log(this.html)
  }

}
