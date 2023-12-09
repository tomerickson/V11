import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IKeyValuePair, KeyValuePair } from 'src/app/core/models/key-value-pair.model';
import { ILookupDataModel } from 'src/app/core/models/lookup-data.model';
import * as appState from '../../state/index';

@Component({
  selector: 'mfmp-feedback-options',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,  MatSelectModule, NgFor],
  templateUrl: './feedback-options.component.html',
  styles: []
})
export class FeedbackOptionsComponent implements OnInit {
  ready = signal(false);
  store: Store = inject(Store);
  form!: FormGroup;
  feedbackOptions!: Observable<ILookupDataModel[]>;
  @Input({ required: true }) controlName!: string;
  @Input() selected!: string | null;
  @Output() feedback: EventEmitter<IKeyValuePair> = new EventEmitter();

  ngOnInit(): void {
    this.form = new FormGroup({selector: new FormControl(this.selected)})
    this.feedbackOptions = this.store.select(
      appState.feature.selectFuelFeedbackModes
    );
    this.ready.set(true);
    console.log('feedback-options.form is ready');
  }
  /*
  To avoid this expensive operation, you can customize the default
   tracking algorithm. by supplying the trackBy option to NgForOf.
   trackBy takes a function that has two arguments: index and item.
   If trackBy is given, Angular tracks changes by the return value of the function.*/
  tracker(index: number, item: ILookupDataModel) {
    return item.code;
  }

  selectFeedback(feedback: MatSelectChange) {
    this.feedback.emit(new KeyValuePair({key: this.controlName, value: feedback.value}));
  }
}
