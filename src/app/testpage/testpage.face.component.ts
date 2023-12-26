import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subscription, take } from 'rxjs';
import { NumericInputComponent } from '../shared/numeric-input/numeric-input.component';
import { SliderLayout } from '../shared/slider-input';

@Component({
  selector: 'mfmp-testpage',
  standalone: true,
  templateUrl: 'testpage.component.html',
  styleUrls: ['testpage.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    NumericInputComponent
  ]
})
export class TestPageFaceComponent implements OnInit, AfterViewInit, OnDestroy {
  // model!: {key: string, value: number}[]
  layout: SliderLayout = 'row';
  elements = 'vsl';
  form!: FormGroup;
  subscriptions: Subscription;

  @ViewChild('maxNuclei') maxNucleiComponent!: NumericInputComponent;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.subscriptions = new Subscription();
  }
  ngAfterViewInit(): void {
    this.subscriptions.add(
      this.maxNucleiComponent.customControl.valueChanges
        .pipe(take(1))
        .subscribe(() => this.cdr.detectChanges())
    );
  }

  ngOnInit(): void {
    this.form = this.fb.group({ myControl: 34 });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  setElements(event: Event) {
    const ctl = event.target as HTMLInputElement;
    const vlu = ctl.value;
    this.elements = vlu;
  }
}
