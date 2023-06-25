import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mfmp-expandable-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expandable-box.component.html',
  styleUrls: ['./expandable-box.component.scss']
})
export class ExpandableBoxComponent {
  @Input({ required: true }) caption!: string;
  @Input({ required: true }) text!: string;
  @Input() hidden: boolean = true;

  toggle = () => {
    this.hidden = !this.hidden;
    console.log(this.hidden);
  };
}
