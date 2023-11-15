import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ILookupDataModel } from 'src/app/core/models/lookup-data.model';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'mfmp-feedback-options',
  standalone: true,
  imports: [CommonModule, MatSelectModule, NgFor],
  templateUrl: './feedback-options.component.html',
  styles: []
})
export class FeedbackOptionsComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  @Input({ required: true }) feedbackOptions!: ILookupDataModel[] | null;
  @Input({ required: true }) controlName: string | undefined;
  @Input() selected!: string | null;

  /*
  To avoid this expensive operation, you can customize the default
   tracking algorithm. by supplying the trackBy option to NgForOf. 
   trackBy takes a function that has two arguments: index and item. 
   If trackBy is given, Angular tracks changes by the return value of the function.*/
  tracker(index: number, item: ILookupDataModel) {
    return item.code;
  }
}
