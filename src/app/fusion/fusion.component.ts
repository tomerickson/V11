import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IElementDataModel } from '../core/element.data.model';
import { NuclidePickerComponent } from '../shared/nuclide-picker/nuclide-picker.component';
import { Store } from '@ngrx/store';
import { HeaderProviderService } from '../shared/header/header.provider.service';
import { MatSelectModule } from '@angular/material/select';
import { ILookupDataModel } from '../core/lookup..data.model';
import { globalFeature } from '../state';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { ComponentStore } from '@ngrx/component-store';
// import { FusionComponentStore } from './fusion-component.state';

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
export class FusionComponent implements OnInit, OnDestroy {
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
  description =
    'This program ("Fusion.php") enables SQL commands to query the Fusion tables originally created from Dr Parkhomov\'s spreadsheets.';

  constructor(private headerService: HeaderProviderService) {}

  execute_query(): void {
    //this.fusionService.getAll();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.elements = this.store.select(globalFeature.selectElements);
    this.sortFields = this.store.select(globalFeature.selectReactionSortFields);
    this.headerService.buildPageHeader('fusion');
    this.buildForm();
    this.ready.next(true);
  }

  buildForm = () => {
    this.fusionForm = this.fb.nonNullable.group({
      tableSet: new FormControl('FusionAll', { nonNullable: true }),
      coreQuery: new FormControl(''),
      resultLimit: new FormControl(1000),
      orderBy: new FormControl('MeV'),
      sortDescending: new FormControl(false),
      leftNuclides: this.fb.nonNullable.group({
        selectedElements: new FormControl(''),
        atomicBosons: new FormControl(true),
        atomicFermions: new FormControl(true),
        nuclearBosons: new FormControl(true),
        nuclearFermions: new FormControl(true),
        neutrinos: new FormControl("2", { nonNullable: true })
      }),
      rightNuclides: this.fb.nonNullable.group({
        selectedElements: new FormControl(''),
        atomicBosons: new FormControl(true),
        atomicFermions: new FormControl(true),
        nuclearBosons: new FormControl(true),
        nuclearFermions: new FormControl(true),
        neutrinos: new FormControl("2", { nonNullable: true })
      }),
      resultNuclides: this.fb.nonNullable.group({
        selectedElements: new FormControl(''),
        atomicBosons: new FormControl(true),
        atomicFermions: new FormControl(true),
        nuclearBosons: new FormControl(true),
        nuclearFermions: new FormControl(true),
        neutrinos: new FormControl("2", { nonNullable: true })
      })
    });
    this.subscriptions.add(
      this.fusionForm.valueChanges.subscribe((data) => {
        this.buildCoreQuery(data);
        console.log(data);
      })
    );
    this.buildCoreQuery(this.fusionForm.value);
  };

  resetForm = () => {
    this.fusionForm.reset({
      tableSet: 'FusionAll',
      coreQuery: '',
      orderBy: '',
      sortDescending: false,
      resultLimit: 1000,
      leftNuclides: {
        selectedElements: null,
        atomicBosons: true,
        atomicFermions: true,
        nuclearBosons: true,
        nuclearFermions: true,
        neutrinos: "2"
      },
      rightNuclides: {
        selectedElements: null,
        atomicBosons: true,
        atomicFermions: true,
        nuclearBosons: true,
        nuclearFermions: true,
        neutrinos: "2"
      },
      resultNuclides: {
        selectedElements: null,
        atomicBosons: true,
        atomicFermions: true,
        nuclearBosons: true,
        nuclearFermions: true,
        neutrinos: "2"
      }
    });
  };

  /**
   * Gather the relevant fields (tableSet, resultLimit,
   * orderBy, orderDirection and the left/right elements) to build the core query.
   * Then update the fusionform.coreQuery field.
   * @param changes
   */
  buildCoreQuery = (changes: any) => {
    const tableSet = changes.tableSet;
    const resultLimit = changes.resultLimit;
    const orderBy = changes.orderBy;
    const sortDescending = changes.sortDescending;
    const leftElements: string[] = changes?.leftNuclides.selectedElements;
    const rightElements: string[] = changes?.rightNuclides.selectedElements;
    let coreQuery = '';
    if (leftElements) {
      coreQuery += `E1 in (${this.wrapElements(leftElements)})`;
    }
    if (rightElements) {
      if (leftElements) coreQuery += ' and ';
      coreQuery += `E2 in (${this.wrapElements(rightElements)})`;
    }
    if (orderBy) {
      coreQuery += ` order by ${orderBy}`;
      if (sortDescending === 'desc') {
        coreQuery += ` desc`;
      }
    }
    if (resultLimit) {
      coreQuery += ` limit ${resultLimit}`;
    }
    if (sortDescending) {
      coreQuery += ' desc'
    }
    let query = this.fusionForm.get('coreQuery');
    if (query) {
      query.setValue(coreQuery, { emitEvent: false });
    }
  }

  wrapElements = (arr: string[]): string => {

    return arr.map((item:string) => `'${item}'`).join();
  }
}

