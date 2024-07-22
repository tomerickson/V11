import { CommonModule } from '@angular/common';
import {} from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatExpansionModule,
  MatExpansionPanel
} from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExpandableBoxComponent } from 'src/app/shared/expandable-box/expandable-box.component';
import { ResultsizePickerComponent } from 'src/app/shared/resultsize-picker/resultsize-picker.component';
import { IElementDataModel } from '../../core/models/element-data.model';
import { ILookupDataModel } from '../../core/models/lookup-data.model';
import { NuclidePickerComponent } from '../../shared/nuclide-picker/nuclide-picker.component';
import { ReportPagesFaceComponent } from '../../shared/report-pages/report-pages.face.component';
import { twoupElementsValidator } from '../two-up-form.validator';
import { TwoUpForm } from 'src/app/core/models/two-up-form.model';
import { SqlForm } from 'src/app/core/models/sql-form.model';

@Component({
  standalone: true,
  selector: 'mfmp-two-up-face',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './two-up-face.component.html',
  styleUrls: ['./two-up-face.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatFormFieldModule,
    NuclidePickerComponent,
    ReactiveFormsModule,
    ReportPagesFaceComponent,
    ResultsizePickerComponent,
    RouterModule,
    ExpandableBoxComponent
  ],
  viewProviders: [MatExpansionPanel]
})
export class TwoUpFaceComponent implements OnInit, OnDestroy {
  private _coreQuery = '';
  private _fullQuery = '';

  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  route: string;
  twoupForm!: FormGroup;
  sqlForm: FormGroup;

  subscriptions: Subscription = new Subscription();
  sortDescendingProxy!: boolean;
  submittable = false;
  sortBy = '';
  sortOrder = '';

  @Input({ required: true }) elements!: IElementDataModel[] | null;
  @Input({ required: true }) sortFields!: ILookupDataModel[] | null;

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

  get elementJoin(): string {
    return this.twoupForm.get('elementJoin')?.value;
  }

  @Output() doit: EventEmitter<FormGroup[]> = new EventEmitter<FormGroup[]>();
  @Output() formChanges: EventEmitter<TwoUpForm> =
    new EventEmitter<TwoUpForm>();
  @Output() sqlChanges: EventEmitter<SqlForm> = new EventEmitter<SqlForm>();

  readonly description =
    "This program enables SQL commands to query the TwoToTwo (2-2) tables originally created from Dr Parkhomov's spreadsheets.";
  readonly initialCoreQuery = ' order by MeV desc limit 1000';
  readonly tablesText =
    "Select 2-2 data table from TwoToTwoAll (original: MeV >= 0.0; 1,215,374 rows; based on the 'Nuclides' table, 293 nuclides), or TwoToTwoAllNewPlus (MeV = +/- any; 3,650,058 rows; based on the 'NuclidesPlus' table, 324 nuclides)";

  constructor() {
    this.route = this.router.routerState.snapshot.url;
    this.sqlForm = this.fb.nonNullable.group({
      coreQuery: new FormControl(this.initialCoreQuery),
      fullQuery: new FormControl(this.fullQuery)
    });
  }

  buildRequestForm(): void {
    this.doit.emit([this.twoupForm, this.sqlForm]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm = () => {
    this.twoupForm = this.fb.nonNullable.group(
      {
        tableSet: new FormControl('TwoToTwoAll', { nonNullable: true }),
        resultLimit: new FormControl(1000),
        orderBy: new FormControl('MeV'),
        elementJoin: new FormControl('and'),
        sortDescending: new FormControl('desc'),
        inputNeutrinos: new FormControl(true),
        outputNeutrinos: new FormControl(true),
        noNeutrinos: new FormControl(true),
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
        leftResults: this.fb.nonNullable.group({
          selectedElements: new FormControl([]),
          nuclearSpin: new FormControl('bf'),
          atomicSpin: new FormControl('bf')
        }),
        rightResults: this.fb.nonNullable.group({
          selectedElements: new FormControl([]),
          nuclearSpin: new FormControl('bf'),
          atomicSpin: new FormControl('bf')
        })
      },
      { validators: twoupElementsValidator }
    );
    this.subscriptions.add(
      this.twoupForm.valueChanges.subscribe((values) =>
        this.handleTwoUpformChanges(values)
      )
    );
    this.subscriptions.add(
      this.sqlForm.valueChanges.subscribe((data) =>
        this.handleSqlFormChanges(data)
      )
    );
    this.resetForm(false);
  };

  resetForm = (emitEvent = true) => {
    this.sqlForm.reset({ coreQuery: this.initialCoreQuery });
    this.twoupForm.reset(
      {
        tableSet: 'TwoToTwoAll',
        orderBy: 'MeV',
        elementJoin: 'and',
        sortDescending: true,
        resultLimit: 1000,
        inputNeutrinos: true,
        outputNeutrinos: true,
        noNeutrinos: true,
        leftNuclides: {
          selectedElements: [],
          atomicSpin: 'bf',
          nuclearSpin: 'bf'
        },
        rightNuclides: {
          selectedElements: [],
          atomicSpin: 'bf',
          nuclearSpin: 'bf'
        },
        leftResults: {
          selectedElements: [],
          atomicSpin: 'bf',
          nuclearSpin: 'bf'
        },
        rightResults: {
          selectedElements: [],
          atomicSpin: 'bf',
          nuclearSpin: 'bf'
        }
      },
      { emitEvent: emitEvent }
    );
    // To initialize coreQuery
    //
    // this.handleSqlFormChanges(this.sqlForm.value);
  };

  resetResults = () => {};

  /**
   * Build out the coreQuery field
   * and the leftResults|rightResults.selectedElements field
   */
  handleTwoUpformChanges = (next: TwoUpForm) => {
    this.buildResultElements(
      next.leftNuclides.selectedElements,
      next.rightNuclides.selectedElements
    );
    this.formChanges.emit(next);
    this.setSubmittable();
  };

  toggleJoin = () => {
    let join = this.twoupForm.get('elementJoin')?.value;
    join = join === 'and' ? 'or' : 'and';
    this.twoupForm.get('elementJoin')?.patchValue(join);
  };

  handleSqlFormChanges = (changes: any) => {
    this.sqlChanges.emit(changes);
    // this.coreQuery = changes?.coreQuery;
    this.setSubmittable();
  };

  getResultLimit = (): number => {
    return this.twoupForm.get('resultLimit')?.value;
  };

  setResultLimit = (limit: number) => {
    this.twoupForm.get('resultLimit')?.patchValue(limit);
  };
  /**
   * We can't submit the query until there's a filter clause present, i.e. E1 in('H','Ni')
   */
  setSubmittable = () => {
    this.submittable =
      this.twoupForm.valid || !this.coreQuery.trimStart().startsWith('order');
  };
  /**
   * concatenate the elements selected  in the
   * left and right element pickers, convert
   * them to a string, and stuff it into
   * leftResults|rightResult.selectedElements
   * @param changes
   */
  buildResultElements = (
    leftElements: string[] | [],
    rightElements: string[] | []
  ) => {
    let resultElements = this.combineElements(leftElements, rightElements);
    this.twoupForm
      .get('leftResults.selectedElements')
      ?.patchValue(resultElements, { onlySelf: true, emitEvents: false });
    this.twoupForm
      .get('rightResults.selectedElements')
      ?.patchValue(resultElements, { onlySelf: true, emitEvents: false });
  };

  /**
   * Merge the left-side and right-side element selections
   *
   * @param leftElements
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
