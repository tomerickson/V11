import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatExpansionModule,
  MatExpansionPanel
} from '@angular/material/expansion';
import { Router, RouterModule } from '@angular/router';
import { Subscription, pairwise } from 'rxjs';
import { IElementDataModel } from 'src/app/core/models/element-data.model';
import { ILookupDataModel } from 'src/app/core/models/lookup-data.model';
import { NuclidePickerComponent } from 'src/app/shared/nuclide-picker/nuclide-picker.component';
import { fissionElementsValidator } from '../fission-form.validator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { ReportPagesFaceComponent } from 'src/app/shared/report-pages/report-pages.face.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ResultsizePickerComponent } from 'src/app/shared/resultsize-picker/resultsize-picker.component';
import { MevPickerComponent } from 'src/app/shared/mev-picker/mev-picker.component';
import { ExpandableBoxComponent } from 'src/app/shared/expandable-box/expandable-box.component';
import { FissionForm } from 'src/app/core/models/fission-form.model';
import { SqlForm } from 'src/app/core/models/sql-form.model';

@Component({
  selector: 'mfmp-fission-face',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    NuclidePickerComponent,
    ReactiveFormsModule,
    ReportPagesFaceComponent,
    ResultsizePickerComponent,
    RouterModule,
    MevPickerComponent,
    ExpandableBoxComponent
  ],
  templateUrl: './fission-face.component.html',
  styleUrls: ['./fission-face.component.scss'],
  viewProviders: [MatExpansionPanel]
})
export class FissionFaceComponent implements OnInit, OnDestroy  {

  private _coreQuery = '';
  private _fullQuery = '';

  @Input({ required: true }) elements!: IElementDataModel[] | null;
  @Input({ required: true }) sortFields!: ILookupDataModel[] | null;
  @Output() doit: EventEmitter<FormGroup[]> = new EventEmitter<FormGroup[]>();

  fb = inject(FormBuilder);
  router = inject(Router);

  readonly description =
    'This program ("Fission.php") enables SQL commands to query the Fission tables created from Dr Parkhomov\'s spreadsheets.';
  readonly tablesText =
    "Select Fission data table from FissionAll (original: MeV > 0.0; 1,733 rows based on the 'Nuclides' table, 293 nuclides), or FissionAllNewPlus (MeV = +/- any; 8037 rows; based on the 'NuclidesPlus' table, 324 Nuclides)";
  readonly initialCoreQuery = ' order by MeV desc limit 1000';
  subscriptions = new Subscription();
  fissionForm!: FormGroup;
  sqlForm!: FormGroup;

  route: string;
  sortDescendingProxy!: boolean;
  submittable = false;
  sortBy = '';
  sortOrder = '';

  /**
   * Core query
   */
  @Input({ required: true }) set coreQuery(value: string) {
    this._coreQuery = value;
    if (this.sqlForm)
      this.sqlForm.get('coreQuery')?.patchValue(value, { emitEvents: false });
  }
  get coreQuery(): string {
    return this._coreQuery;
  }

  /**
   * Full query
   */
  @Input({ required: true }) set fullQuery(value: string) {
    this._fullQuery = value;
    if (this.sqlForm)
      this.sqlForm.get('fullQuery')?.patchValue(value, { emitEvents: false });
  }
  get fullQuery(): string {
    return this._fullQuery;
  }

  @Output() formChanges: EventEmitter<FissionForm> =
    new EventEmitter<FissionForm>();
  @Output() sqlChanges: EventEmitter<SqlForm> = new EventEmitter<SqlForm>();

  constructor() {
    this.route = this.router.routerState.snapshot.url;
    this.sqlForm = this.fb.nonNullable.group({
      coreQuery: new FormControl(this.initialCoreQuery),
      fullQuery: new FormControl('')
    });
  }

  buildRequestForm(): void {
    this.doit.emit([this.fissionForm, this.sqlForm]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.buildForm();
    // this.ready.next(true);
  }

  buildForm = () => {
    this.sqlForm = this.fb.nonNullable.group({
      coreQuery: new FormControl(this.initialCoreQuery),
      fullQuery: new FormControl('')
    });
    this.fissionForm = this.fb.nonNullable.group(
      {
        tableSet: new FormControl('FissionAll', { nonNullable: true }),
        resultLimit: new FormControl(1000),
        mevLimit: new FormControl(0),
        orderBy: new FormControl('MeV'),
        sortDescending: new FormControl(true),
        inputNeutrinos: new FormControl(true),
        outputNeutrinos: new FormControl(true),
        noNeutrinos: new FormControl(true),
        nuclides: this.fb.nonNullable.group({
          selectedElements: new FormControl([]),
          nuclearSpin: new FormControl('bf'),
          atomicSpin: new FormControl('bf')
        }),
        output1: this.fb.nonNullable.group({
          selectedElements: new FormControl([]),
          nuclearSpin: new FormControl('bf'),
          atomicSpin: new FormControl('bf')
        }),
        output2: this.fb.nonNullable.group({
          selectedElements: new FormControl([]),
          nuclearSpin: new FormControl('bf'),
          atomicSpin: new FormControl('bf')
        })
      },
      { validators: fissionElementsValidator }
    );
    this.subscriptions.add(
      this.fissionForm.valueChanges
        .subscribe(data =>
          this.handleFissionFormChanges(data)
        )
    );
    this.subscriptions.add(
      this.sqlForm.valueChanges.subscribe(data =>
        this.handleSqlFormChanges(data)
      )
    );
  };

  resetForm = () => {
    this.sqlForm.reset({ coreQuery: this.initialCoreQuery, fullQuery:'' });
    this.fissionForm.reset({
      tableSet: 'FissionAll',
      orderBy: 'MeV',
      sortDescending: true,
      resultLimit: 1000,
      mevLimit: 0,
      inputNeutrinos: true,
      outputNeutrinos: true,
      noNeutrinos: true,
      nuclides: {
        selectedElements: [],
        nuclearSpin: 'bf',
        atomicSpin: 'bf'
      },
      output1: {
        selectedElements: null,
        nuclearSpin: 'bf',
        atomicSpin: 'bf'
      },
      output2: {
        selectedElements: null,
        nuclearSpin: 'bf',
        atomicSpin: 'bf'
      }
    });
    this.handleSqlFormChanges(this.sqlForm.value);
  };

  resetResults = () => {};

  /**
   * Build out the coreQuery field
   * and the resultNuclides.selectedElements field
   */
  handleFissionFormChanges = (data: any) => {
    console.log('form:', data);
    this.formChanges.emit(data as FissionForm);
    this.setSubmittable();
  };

  handleSqlFormChanges = (changes: any) => {
    this.sqlChanges.emit(changes);
    this.setSubmittable();
  };

  getResultLimit = (): number => {
    return this.fissionForm.get('resultLimit')?.value;
  };

  setResultLimit = (limit: number) => {
    this.fissionForm.get('resultLimit')?.patchValue(limit);
  };

  setMevLimit = (limit: number) => {
    this.fissionForm.get('mevLimit')?.patchValue(limit);
  }
  /**
   * We can't submit the query until there's a filter clause present, i.e. E1 in('H','Ni')
   */
  setSubmittable = () => {
    this.submittable =
      this.fissionForm.valid || !this.coreQuery.trimStart().startsWith('order');
  };

  /**
   * Gather the relevant fields (tableSet, resultLimit,
   * orderBy, orderDirection and the left/right elements) to build the core query.
   * Then update the fissionform.coreQuery field.
   * @param changes
   */
  buildResultElements = (
    leftElements: string[] | [],
    rightElements: string[] | []
  ) => {
    let resultElements = this.combineElements(leftElements, rightElements);
    this.fissionForm
      .get('resultNuclides.selectedElements')
      ?.patchValue(resultElements, { onlySelf: true, emitEvents: false });
  };

  /**
   * Merge the left-side and right-side element selections
   *
   * @param elements
   * @param rightElements
   * @param stringify
   * @returns combined elements
   * @description if stringify is true, combine
   */
  combineElements = (
    a: string[],
    b: string[],
    stringify: boolean = false
  ): string[] | string => {
    const c = a.concat(b.filter((item) => a.indexOf(item) < 0));

    if (stringify) {
      return `('${c.join("','")}')`;
    } else {
      return c;
    }
  };
}
