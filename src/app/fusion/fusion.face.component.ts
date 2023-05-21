import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IElementDataModel } from '../core/models/element-data.model';
import { ILookupDataModel } from '../core/models/lookup.-data.model';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { NuclidePickerComponent } from '../shared/nuclide-picker/nuclide-picker.component';
import { missingElementsValidator } from './fusion-form.validator';
import { QueryResultsComponent } from '../shared/query-results/query-results.component';
import { QueryWrapperComponent } from './query-wrapper.component';

@Component({
  standalone: true,
  selector: 'mfmp-fusion-face',
  templateUrl: './fusion.face.component.html',
  styleUrls: ['./fusion.face.component.scss'],
  imports: [
    CommonModule,
    HttpClientModule,
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
    QueryWrapperComponent
  ],
  providers: [{ provide: HeaderProviderService }]
})
export class FusionFaceComponent implements OnChanges, OnInit, OnDestroy {
  fb: FormBuilder = inject(FormBuilder);
  fusionForm!: FormGroup;
  leftNuclides!: FormGroup;
  rightNuclides!: FormGroup;
  resultNuclides!: FormGroup;

  ready: BehaviorSubject<boolean> = new BehaviorSubject(false);
  subscriptions: Subscription = new Subscription();
  sortDescendingProxy!: boolean;
  submittable = false;
  sortBy = '';
  sortOrder = '';
  coreQuery = '';

  @Input({ required: true }) elements: IElementDataModel[] | null = null;
  @Input({ required: true }) sortFields: ILookupDataModel[] | null = null;
  @Input({ required: true }) fusionResults: any[] = [];
  @Input({ required: true }) nuclideResults: any[] = [];
  @Input({ required: true }) elementResults: any[] = [];
  @Output() doit: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  readonly description =
    'This program ("Fusion.php") enables SQL commands to query the Fusion tables originally created from Dr Parkhomov\'s spreadsheets.';

  constructor(private headerService: HeaderProviderService) {}

  /**
   * Convert spin choices to a string for postback
  
   * @param bosons 
   * @param fermions 
   * @returns 
   * @remarks
   * If both choices are false convert them to true
   */
  formatSpinChoices = (bosons: boolean, fermions: boolean): string => {
    return bosons && fermions ? 'bf' : bosons ? 'b' : fermions ? 'f' : 'bf';
  };

  build_request_form(): void {
    this.doit.emit(this.fusionForm);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
    this.buildForm();
    this.leftNuclides = this.fusionForm.get('leftNuclides') as FormGroup;
    this.rightNuclides = this.fusionForm.get('rightNuclides') as FormGroup;
    this.resultNuclides = this.fusionForm.get('resultNuclides') as FormGroup;
    this.ready.next(true);
  }

  buildForm = () => {
    this.fusionForm = this.fb.nonNullable.group(
      {
        tableSet: new FormControl('FusionAll', { nonNullable: true }),
        coreQuery: new FormControl(' order by MeV desc limit 1000'),
        resultLimit: new FormControl(1000),
        orderBy: new FormControl('MeV'),
        sortDescending: new FormControl(true),
        inputNeutrinos: new FormControl(true),
        outputNeutrinos: new FormControl(true),
        noNeutrinos: new FormControl(true),
        leftNuclides: this.fb.nonNullable.group({
          selectedElements: new FormControl(''),
          atomicBosons: new FormControl(true),
          atomicFermions: new FormControl(true),
          nuclearBosons: new FormControl(true),
          nuclearFermions: new FormControl(true)
        }),
        rightNuclides: this.fb.nonNullable.group({
          selectedElements: new FormControl(''),
          atomicBosons: new FormControl(true),
          atomicFermions: new FormControl(true),
          nuclearBosons: new FormControl(true),
          nuclearFermions: new FormControl(true)
        }),
        resultNuclides: this.fb.nonNullable.group({
          selectedElements: new FormControl(''),
          atomicBosons: new FormControl(true),
          atomicFermions: new FormControl(true),
          nuclearBosons: new FormControl(true),
          nuclearFermions: new FormControl(true)
        })
      },
      { validators: missingElementsValidator }
    );
    this.subscriptions.add(
      this.fusionForm.valueChanges.subscribe((data) => {
        this.handleFormChanges(data);
        // console.log(JSON.stringify(data, undefined, 2));
      })
    );
    // this.handleFormChanges(this.fusionForm.value);
  };

  resetForm = () => {
    this.fusionForm.reset({
      tableSet: 'FusionAll',
      coreQuery: '',
      orderBy: 'MeV',
      sortDescending: true,
      resultLimit: 1000,
      inputNeutrinos: true,
      outputNeutrinos: true,
      noNeutrinos: true,
      leftNuclides: {
        selectedElements: [],
        atomicBosons: true,
        atomicFermions: true,
        nuclearBosons: true,
        nuclearFermions: true
      },
      rightNuclides: {
        selectedElements: [],
        atomicBosons: true,
        atomicFermions: true,
        nuclearBosons: true,
        nuclearFermions: true
      },
      resultNuclides: {
        selectedElements: [],
        atomicBosons: true,
        atomicFermions: true,
        nuclearBosons: true,
        nuclearFermions: true
      }
    });
    // To initialize coreQuery
    //
    this.handleFormChanges(this.fusionForm.value);
  };

  resetResults = () => {
    this.fusionResults = [];
    this.nuclideResults = [];
    this.elementResults = [];
  };
  /**
   * Build out the coreQuery field
   * and the resultNuclides.selectedElements field
   */
  handleFormChanges = (changes: any) => {
    const leftElements = changes?.leftNuclides.selectedElements;
    const rightElements = changes?.rightNuclides.selectedElements;
    this.buildResultElements(leftElements, rightElements);
    this.buildCoreQuery(changes, leftElements, rightElements);
    this.submittable = this.fusionForm.valid;
  };

  getResultLimit = (): number => {
    return this.fusionForm.get('resultLimit')?.value;
  };

  /**
   * concatenate the elements selected  in the
   * left and right element pickers, convert
   * them to a string, and stuff it into
   * resultNuclides.selectedElements
   * @param changes
   */
  buildResultElements = (
    leftElements: string[] | null,
    rightElements: string[] | null
  ) => {
    let resultElements = this.combineElements(leftElements, rightElements);
    this.fusionForm
      .get('resultNuclides.selectedElements')
      ?.patchValue(resultElements, { onlySelf: true, emitEvents: false });
  };

  /**
   * Gather the relevant fields (tableSet, resultLimit,
   * orderBy, orderDirection and the left/right elements) to build the core query.
   * Then update the fusionform.coreQuery field.
   * @param changes
   */
  buildCoreQuery = (
    changes: any,
    leftElements: string[] | null,
    rightElements: string[] | null
  ) => {
    const tableSet = changes.tableSet;
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
    if (leftElements == null) leftElements = [];
    if (rightElements == null) rightElements = [];
    if (leftElements.length > 0) {
      query += `E1 in ${this.combineElements(leftElements, null, true)}`;
    }
    if (rightElements.length > 0) {
      if (leftElements.length > 0) {
        query += ' and ';
      }
      query += `E2 in ${this.combineElements(rightElements, null, true)}`;
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

    this.fusionForm
      .get('coreQuery')
      ?.patchValue(query, { onlySelf: true, emitEvent: false });
    this.coreQuery = query;
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
    leftElements: string[] | null,
    rightElements: string[] | null,
    stringify: boolean = false
  ): string[] | null | string => {
    if (leftElements || rightElements) {
      let result: string | string[];
      if (leftElements && rightElements) {
        result = leftElements.concat(rightElements);
      } else {
        if (leftElements) {
          result = leftElements;
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
