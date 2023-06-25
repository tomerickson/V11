import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatExpansionModule,
  MatExpansionPanel
} from '@angular/material/expansion';
import { Router } from '@angular/router';
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
    MevPickerComponent,
    ExpandableBoxComponent
  ],
  templateUrl: './fission-face.component.html',
  styleUrls: ['./fission-face.component.scss'],
  viewProviders: [MatExpansionPanel]
})
export class FissionFaceComponent {
  @Input({ required: true }) elements!: IElementDataModel[] | null;
  @Input({ required: true }) sortFields!: ILookupDataModel[] | null;
  @Output() doit: EventEmitter<FormGroup[]> = new EventEmitter<FormGroup[]>();

  fb = inject(FormBuilder);
  router = inject(Router);

  description =
    'This program ("Fission.php") enables SQL commands to query the Fission tables created from Dr Parkhomov\'s spreadsheets.';
  tablesText = "Select Fission data table from FissionAll (original: MeV > 0.0; 1,733 rows based on the 'Nuclides' table, 293 nuclides), or FissionAllNewPlus (MeV = +/- any; 8037 rows; based on the 'NuclidesPlus' table, 324 Nuclides)";
   subscriptions = new Subscription();
    fissionForm!: FormGroup;
  sqlForm!: FormGroup;
  nuclides!: FormGroup;
  output1!: FormGroup;
  output2!: FormGroup;
  initialCoreQuery!: string;
  route: string;
  sortDescendingProxy!: boolean;
  submittable = false;
  sortBy = '';
  sortOrder = '';
  coreQuery = '';

  constructor() {
    this.route = this.router.routerState.snapshot.url;
  }

  buildRequestForm(): void {
    this.doit.emit([this.fissionForm, this.sqlForm]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.buildForm();
    this.nuclides = this.fissionForm.get('nuclides') as FormGroup;
    this.output1 = this.fissionForm.get('output1') as FormGroup;
    this.output2 = this.fissionForm.get('output2') as FormGroup;
    // this.ready.next(true);
  }


  buildForm = () => {
    this.sqlForm = this.fb.nonNullable.group({
      coreQuery: new FormControl(this.initialCoreQuery)
    });
    this.fissionForm = this.fb.nonNullable.group(
      {
        tableSet: new FormControl('FissionAll', { nonNullable: true }),
        resultLimit: new FormControl(1000),
        orderBy: new FormControl('MeV'),
        sortDescending: new FormControl(true),
        inputNeutrinos: new FormControl(true),
        outputNeutrinos: new FormControl(true),
        noNeutrinos: new FormControl(true),
        nuclides: this.fb.nonNullable.group({
          selectedElements: new FormControl(''),
          atomicBosons: new FormControl(true),
          atomicFermions: new FormControl(true),
          nuclearBosons: new FormControl(true),
          nuclearFermions: new FormControl(true)
        }),
        output1: this.fb.nonNullable.group({
          selectedElements: new FormControl(''),
          atomicBosons: new FormControl(true),
          atomicFermions: new FormControl(true),
          nuclearBosons: new FormControl(true),
          nuclearFermions: new FormControl(true)
        }),
        output2: this.fb.nonNullable.group({
          selectedElements: new FormControl(''),
          atomicBosons: new FormControl(true),
          atomicFermions: new FormControl(true),
          nuclearBosons: new FormControl(true),
          nuclearFermions: new FormControl(true)
        }),
      },
      { validators: fissionElementsValidator }
    );
    this.subscriptions.add(
      this.fissionForm.valueChanges
        .pipe(pairwise())
        .subscribe(([prev, next]) => this.handleFissionFormChanges([prev, next]))
    );
    this.subscriptions.add(
      this.sqlForm.valueChanges.subscribe((data) =>
        this.handleSqlFormChanges(data)
      )
    );
  };

  resetForm = () => {
    this.sqlForm.reset({ coreQuery: this.initialCoreQuery });
    this.fissionForm.reset({
      tableSet: 'FissionAll',
      orderBy: 'MeV',
      sortDescending: true,
      resultLimit: 1000,
      inputNeutrinos: true,
      outputNeutrinos: true,
      noNeutrinos: true,
      nuclides: {
        selectedElements: null,
        atomicBosons: true,
        atomicFermions: true,
        nuclearBosons: true,
        nuclearFermions: true
      },
      output1: {
        selectedElements: null,
        atomicBosons: true,
        atomicFermions: true,
        nuclearBosons: true,
        nuclearFermions: true
      },
      output2: {
        selectedElements: null,
        atomicBosons: true,
        atomicFermions: true,
        nuclearBosons: true,
        nuclearFermions: true
      }
    });
    // To initialize coreQuery
    //
    // this.handleFissionFormChanges([this.fissionForm.value, this.fissionForm.value]);
    this.handleSqlFormChanges(this.sqlForm.value);
  };

  resetResults = () => {};

  /**
   * Build out the coreQuery field
   * and the resultNuclides.selectedElements field
   */
  handleFissionFormChanges = ([prev, next]: [any, any]) => {
    let elementChanges = false;
    let queryChanges = false;
    const elements = next.nuclides.selectedElements;
    const orderBy = next.orderBy;
    const sortDescending = next.sortDescending;
    const resultLimit = next.resultLimit;
    if (
      prev.nuclides.selectedElements != next.nuclides.selectedElements 
    ) {
      elementChanges = true;
    }
    if (
      prev.orderBy != orderBy ||
      prev.sortDescending != sortDescending ||
      prev.resultLimit != resultLimit
    ) {
      queryChanges = true;
    }
    if (queryChanges || elementChanges) {
      this.buildCoreQuery(next, elements);
    }
    this.setSubmittable();
  };

  handleSqlFormChanges = (changes: any) => {
    this.coreQuery = changes?.coreQuery;
    this.setSubmittable();
  };

  getResultLimit = (): number => {
    return this.fissionForm.get('resultLimit')?.value;
  };

  setResultLimit = (limit: number) => {
    this.fissionForm.get('resultLimit')?.patchValue(limit);
  }
  /**
   * We can't submit the query until there's a filter clause present, i.e. E1 in('H','Ni')
   */
  setSubmittable = () => {
    this.submittable = this.fissionForm.valid || !this.coreQuery.trimStart().startsWith('order');
  }

  /**
   * Gather the relevant fields (tableSet, resultLimit,
   * orderBy, orderDirection and the left/right elements) to build the core query.
   * Then update the fissionform.coreQuery field.
   * @param changes
   */
  buildCoreQuery = (
    changes: any,
    elements: string[] | null
  ) => {
    const resultLimit = changes.resultLimit;
    const orderBy = changes.orderBy;
    let sortDescending = changes.sortDescending;

    /**
     * @remarks
     * This is a hack.
     *
     * Valuechanges is firing twice when patchValue is called
     * in spite of the emitEvents: false
     *
     * Using the sortDescendingProxy to hold the valid
     * state of the sortDescending property.
     *
     */
    if (typeof sortDescending === 'boolean') {
      this.sortDescendingProxy = sortDescending;
    } else {
      sortDescending = this.sortDescendingProxy;
    }

    let query = '';
    if (elements == null) elements = [];
 
    if (elements.length > 0) {
      query += `E1 in ${this.combineElements(elements, null, true)}`;
    }
    if (orderBy) {
      query += ` order by ${orderBy}`;
      if (sortDescending === true) {
        query += ` desc`;
      }
    }
    if (resultLimit) {
      query += ` limit ${resultLimit}`;
    }

    this.sqlForm
      .get('coreQuery')
      ?.patchValue(query, { onlySelf: true});
    this.coreQuery = query;
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
    elements: string[] | null,
    rightElements: string[] | null,
    stringify: boolean = false
  ): string[] | null | string => {
    if (elements || rightElements) {
      let result: string | string[];
      if (elements && rightElements) {
        result = elements.concat(rightElements);
      } else {
        if (elements) {
          result = elements;
        } else {
          if (rightElements) {
            result = rightElements;
          } else {
            throw 'unreachable code reached!';
          }
        }
      }
      if (stringify) {
        result = `('${result.join("','")}')`;
      }
      return result;
    } else {
      return null;
    }
  };
}
