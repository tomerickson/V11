import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { IElementDataModel } from '../core/models/element-data.model';
import { NuclidePickerComponent } from '../shared/nuclide-picker/nuclide-picker.component';

@Component({
  selector: 'mfmp-testpage',
  standalone: true,
  template: `
    <ul></ul>
    <form [formGroup]="testForm">
      <input type="text" formControlName="someValue" />
      <input type="text" formControlName="otherValue" />
      <mfmp-nuclide-picker
        [title]="'testing'"
        [role]="'query'"
        [caption]="'caption'"
        [elementsList]="elements"
        [multiselect]="true"
        [formGroupName]="'leftNuclides'"></mfmp-nuclide-picker>
        <mfmp-nuclide-picker
        [title]="'testing'"
        [role]="'query'"
        [caption]="'caption'"
        [elementsList]="elements"
        [multiselect]="true"
        [formGroupName]="'rightNuclides'"></mfmp-nuclide-picker>
        <mfmp-nuclide-picker
        [title]="'testing'"
        [role]="'query'"
        [caption]="'caption'"
        [elementsList]="elements"
        [multiselect]="true"
        [formGroupName]="'resultNuclides'"></mfmp-nuclide-picker>
    </form>
    <pre>
    {{ testForm.value | json }}
  </pre
    >
  `,
  imports: [
    CommonModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    NgFor,
    ReactiveFormsModule,
    NuclidePickerComponent
  ]
})
export class TestPageFaceComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  testForm!: FormGroup;
  subscriptions: Subscription = new Subscription();
  @Input({ required: true }) elements!: IElementDataModel[] | null;

  ngOnInit() {
    this.testForm = this.fb.group({
      someValue: [''],
      otherValue: [''],
      leftNuclides: this.fb.group({
        selectedElements: new FormControl<string[]>([]),
        atomicBosons: new FormControl<boolean | null>(true),
        atomicFermions: new FormControl<boolean | null>(true),
        nuclearBosons: new FormControl<boolean | null>(true),
        nuclearFermions: new FormControl<boolean | null>(true)
      }),
      rightNuclides: this.fb.group({
        selectedElements: new FormControl<string[]>([]),
        atomicBosons: new FormControl<boolean | null>(true),
        atomicFermions: new FormControl<boolean | null>(true),
        nuclearBosons: new FormControl<boolean | null>(true),
        nuclearFermions: new FormControl<boolean | null>(true)
      }),
      resultNuclides: this.fb.group({
        selectedElements: new FormControl<string[]>([]),
        atomicBosons: new FormControl<boolean | null>(true),
        atomicFermions: new FormControl<boolean | null>(true),
        nuclearBosons: new FormControl<boolean | null>(true),
        nuclearFermions: new FormControl<boolean | null>(true)
      })
    });

    this.subscriptions.add(
      this.testForm.valueChanges.subscribe((changes) =>
        this.handleValueChanges(changes)
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  handleValueChanges(changes: any) {
    console.log(changes);
  }
}
