import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mfmp-note-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-content.component.html',
  styleUrls: ['./note-content.component.scss']
})
export class NoteContentComponent implements OnInit {


  @Input({required: true})  html!: HTMLCollection;

  ngOnInit(): void {
    console.log(this.html)
  }

}
