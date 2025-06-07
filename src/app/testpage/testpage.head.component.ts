import { CommonModule } from '@angular/common';
import { Component, OnInit, importProvidersFrom, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { IElementDataModel } from '../core/models/element-data.model';
import { NuclideDialogComponent } from '../shared/nuclide-dialog/nuclide-dialog.component';
import * as appState from '../state';
@Component({
  selector: 'mfmp-testpage',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    NuclideDialogComponent  ],
  providers: [],
  templateUrl: './testpage-head.component.html',
  styleUrls: ['./testpage-head.component.scss']
})
export class TestpageHeadComponent implements OnInit {
  store: Store = inject(Store);
  title = signal<string>('Test Page');
  elements = signal<IElementDataModel[]>([]);
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<NuclideDialogComponent>);
  dialogForm!: FormGroup;

  get options(): FormControl {
    return this.dialogForm.get('options') as FormControl;
  }
  toggleJoin = () => {
    let join: string = this.dialogForm.get('elementJoin')?.value ?? '';
    join = join === 'and' ? 'or' : 'and';
    this.dialogForm.get('elementJoin')?.patchValue(join);
  };

  ngOnInit() {
    const obj = this.store.select(appState.feature.selectElements);
    if (obj instanceof Observable) {
      from(obj).subscribe((elements: IElementDataModel[]) => {
        this.elements.set(elements);
      });
    } else {
      this.elements.set(obj);
    }

    this.dialogForm = this.fb.group({
      counter: 0,
      options: ['Core', [Validators.required]],
      elementJoin: new FormControl('and'),
      leftNuclides: this.fb.nonNullable.group({
        selectedElements: new FormControl([]),
        nuclearSpin: new FormControl('bf'),
        atomicSpin: new FormControl('bf')
      }),
      rightNuclides: this.fb.nonNullable.group({
        selectedElements: new FormControl([]),
        nuclearSpin: new FormControl('bf'),
        atomicSpin: new FormControl('bf')
      }),
      resultNuclides: this.fb.nonNullable.group({
        selectedElements: new FormControl([]),
        nuclearSpin: new FormControl('bf'),
        atomicSpin: new FormControl('bf')
      })
    });
  }
}
