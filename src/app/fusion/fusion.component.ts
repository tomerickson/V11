import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  AfterContentInit,
  Component,
  OnDestroy,
  OnInit,
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
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IElementDataModel } from '../core/element.data.model';
import { ILookupDataModel } from '../core/lookup..data.model';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { NuclidePickerComponent } from '../shared/nuclide-picker/nuclide-picker.component';
import { globalFeature } from '../state';
import { missingElementsValidator } from './fusion-form.validator';

@Component({
  standalone: true,
  selector: 'mfmp-fusion',
  templateUrl: './fusion.component.html',
  styleUrls: ['./fusion.component.scss'],
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
    ReactiveFormsModule
  ],
  providers: [{ provide: HeaderProviderService }]
})
export class FusionComponent implements OnInit, OnDestroy, AfterContentInit {
  http!: HttpClient;
  store = inject(Store);
  fb: FormBuilder = inject(FormBuilder);
  fusionForm!: FormGroup;
  leftNuclides!: FormGroup;
  rightNuclides!: FormGroup;
  resultNuclides!: FormGroup;
  elements!: Observable<IElementDataModel[]>;
  sortFields!: Observable<ILookupDataModel[]>;
  ready: BehaviorSubject<boolean> = new BehaviorSubject(false);
  subscriptions: Subscription = new Subscription();
  sortDescendingProxy!: boolean;
  submittable = false;

  readonly description =
    'This program ("Fusion.php") enables SQL commands to query the Fusion tables originally created from Dr Parkhomov\'s spreadsheets.';

  constructor(private headerService: HeaderProviderService) {}

  execute_query(): void {
    const formData: FormData = new FormData();
    const leftNeutrinos = this.fusionForm.get(
      'resultNuclides.leftNeutrinos'
    )?.value;
    const noNeutrinos = this.fusionForm.get(
      'resultNuclides.noNeutrinos'
    )?.value;
    const rightNeutrinos = this.fusionForm.get(
      'resultNuclides.rightNeutrinos'
    )?.value;
    const leftNuclearBosons = this.fusionForm.get(
      'leftNuclides.nuclearBosons'
    )?.value;
    const leftNuclearFermions = this.fusionForm.get(
      'leftNuclides.nuclearFermions'
    )?.value;
    const leftAtomicBosons = this.fusionForm.get(
      'leftNuclides.atomicBosons'
    )?.value;
    const leftAtomicFermions = this.fusionForm.get(
      'leftNuclides.atomicFermions'
    )?.value;
    const rightNuclearBosons = this.fusionForm.get(
      'rightNuclides.nuclearBosons'
    )?.value;
    const rightNuclearFermions = this.fusionForm.get(
      'rightNuclides.nuclearFermions'
    )?.value;
    const rightAtomicBosons = this.fusionForm.get(
      'rightNuclides.atomicBosons'
    )?.value;
    const rightAtomicFermions = this.fusionForm.get(
      'rightNuclides.atomicFermions'
    )?.value;
    const resultNuclearBosons = this.fusionForm.get(
      'resultNuclides.nuclearBosons'
    )?.value;
    const resultNuclearFermions = this.fusionForm.get(
      'resultNuclides.nuclearFermions'
    )?.value;
    const resultAtomicBosons = this.fusionForm.get(
      'resultNuclides.atomicBosons'
    )?.value;
    const resultAtomicFermions = this.fusionForm.get(
      'resultNuclides.atomicFermions'
    )?.value;
    formData.append('doit', 'execute_query');
    formData.append('query', this.fusionForm.get('coreQuery')?.value);
    formData.append('table_name', this.fusionForm.get('tableSet')?.value);
    if (leftNeutrinos) {
      formData.append('sql_tables[]', 'left');
    }
    if (noNeutrinos) {
      formData.append('sql_tables[]', 'none');
    }
    if (rightNeutrinos) {
      formData.append('sql_tables[]', 'right');
    }
    console.log(formData);
    // this.http
    //   .post('http://localhost:4000/api/create-user', formData)
    //   .subscribe({
    //     next: (response) => console.log(response),
    //     error: (error) => console.log(error),
    //   });
  }

  /*
doit: execute_query
query: E1 in ('H','Na') and E2 in ('C','N') order by MeV desc limit 1000
table_name: FusionAll
sql_tables[]: left
sql_tables[]: none
sql_tables[]: right
nBorF1_filter: bf
aBorF1_filter: bf
nBorF2_filter: bf
aBorF2_filter: bf
nBorF_filter: bf
aBorF_filter: bf;
*/

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.elements = this.store.select(globalFeature.selectElements);
    this.sortFields = this.store.select(globalFeature.selectReactionSortFields);
    this.headerService.buildPageHeader('fusion');
    this.buildForm();
    this.leftNuclides = this.fusionForm.get('leftNuclides') as FormGroup;
    this.rightNuclides = this.fusionForm.get('rightNuclides') as FormGroup;
    this.resultNuclides = this.fusionForm.get('resultNuclides') as FormGroup;
    this.ready.next(true);
  }

  ngAfterContentInit(): void {}

  buildForm = () => {
    this.fusionForm = this.fb.nonNullable.group(
      {
        tableSet: new FormControl('FusionAll', { nonNullable: true }),
        coreQuery: new FormControl(''),
        resultLimit: new FormControl(1000),
        orderBy: new FormControl('MeV'),
        sortDescending: new FormControl(true),
        leftNuclides: this.fb.nonNullable.group({
          selectedElements: new FormControl(''),
          atomicBosons: new FormControl(true),
          atomicFermions: new FormControl(true),
          nuclearBosons: new FormControl(true),
          nuclearFermions: new FormControl(true),
          leftNeutrinos: new FormControl(true),
          noNeutrinos: new FormControl(true),
          rightNeutrinos: new FormControl(true)
        }),
        rightNuclides: this.fb.nonNullable.group({
          selectedElements: new FormControl(''),
          atomicBosons: new FormControl(true),
          atomicFermions: new FormControl(true),
          nuclearBosons: new FormControl(true),
          nuclearFermions: new FormControl(true),
          leftNeutrinos: new FormControl(true),
          noNeutrinos: new FormControl(true),
          rightNeutrinos: new FormControl(true)
        }),
        resultNuclides: this.fb.nonNullable.group({
          selectedElements: new FormControl(''),
          atomicBosons: new FormControl(true),
          atomicFermions: new FormControl(true),
          nuclearBosons: new FormControl(true),
          nuclearFermions: new FormControl(true),
          leftNeutrinos: new FormControl(true),
          noNeutrinos: new FormControl(true),
          rightNeutrinos: new FormControl(true)
        })
      },
      { validators: missingElementsValidator }
    );
    this.subscriptions.add(
      this.fusionForm.valueChanges.subscribe((data) => {
        this.handleFormChanges(data);
        console.log(data);
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
      leftNuclides: {
        selectedElements: [],
        atomicBosons: true,
        atomicFermions: true,
        nuclearBosons: true,
        nuclearFermions: true,
        leftNeutrinos: true,
        noNeutrinos: true,
        rightNeutrinos: true
      },
      rightNuclides: {
        selectedElements: [],
        atomicBosons: true,
        atomicFermions: true,
        nuclearBosons: true,
        nuclearFermions: true,
        leftNeutrinos: true,
        noNeutrinos: true,
        rightNeutrinos: true
      },
      resultNuclides: {
        selectedElements: [],
        atomicBosons: true,
        atomicFermions: true,
        nuclearBosons: true,
        nuclearFermions: true,
        leftNeutrinos: true,
        noNeutrinos: true,
        rightNeutrinos: true
      }
    });
    // To initialize coreQuery
    //
    this.handleFormChanges(this.fusionForm.value);
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
  } 

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
     * inspite of the emitEvents: false
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
    // this.fusionForm.patchValue({coreQuery: query}, {onlySelf: true, emitEvent: false})
    this.fusionForm
      .get('coreQuery')
      ?.patchValue(query, { onlySelf: true, emitEvent: false });
  };

/**
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
      let result: string | string[] ;
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
      if(stringify) {
        result = `('${result.join("','")}')`;
      }
      return result;
    } else {
      return null;
    }
  };
}
