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
import { BehaviorSubject, Head, Observable, Subscription } from 'rxjs';
import { IElementDataModel } from '../core/element.data.model';
import { NuclidePickerComponent } from '../shared/nuclide-picker/nuclide-picker.component';
import { Store } from '@ngrx/store';
import { HeaderProviderService } from '../shared/header/header.provider.service';
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
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSliderModule,
    MatFormFieldModule,
    NuclidePickerComponent,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HeaderProviderService }
  ]
})
export class FusionComponent implements OnInit, OnDestroy {

  store = inject(Store);
  fb: FormBuilder = inject(FormBuilder);
  fusionForm!: FormGroup;
  leftNuclides!: FormGroup;
  rightNuclides!: FormGroup;
  resultNuclides!: FormGroup;
  elements!: Observable<IElementDataModel[]>;
  ready: BehaviorSubject<boolean> = new BehaviorSubject(false);
  subscriptions: Subscription = new Subscription();

  constructor(private headerService: HeaderProviderService) {}
  
  execute_query(): void {
    //this.fusionService.getAll();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    
    this.headerService.buildPageHeader('fusion');
    this.buildForm();
    this.ready.next(true);
  }

  buildForm = () => {
    this.fusionForm = this.fb.nonNullable.group({
      tableSet: new FormControl('FusionAll', { nonNullable: true }),
      coreQuery: new FormControl(''),
      resultLimit: new FormControl(1000),
      leftNuclides: this.fb.nonNullable.group({
        selectedElements: new FormControl(''),
        atomicSpin: new FormControl(''),
        nuclearSpin: new FormControl(''),
        neutrinos: new FormControl(2, { nonNullable: true })
      }),
      rightNuclides: this.fb.nonNullable.group({
        selectedElements: new FormControl(''),
        atomicSpin: new FormControl(''),
        nuclearSpin: new FormControl(''),
        neutrinos: new FormControl(2, { nonNullable: true })
      }),
      resultNuclides: this.fb.nonNullable.group({
        selectedElements: new FormControl(''),
        atomicSpin: new FormControl(''),
        nuclearSpin: new FormControl(''),
        neutrinos: new FormControl(2, { nonNullable: true })
      })
    });
    this.subscriptions.add(
      this.fusionForm.valueChanges.subscribe((data) => console.log(data))
    );
  };

  resetForm = () => {
    this.fusionForm.reset({
      tableSet: 'FusionAll',
      coreQuery: '',
      resultLimit: 1000,
      leftNuclides: {
        selectedElements: null,
        atomicSpin: 2,
        nuclearSpin: 2,
        neutrinos: 2
      },
      rightNuclides: {
        selectedElements: null,
        atomicSpin: 2,
        nuclearSpin: 2,
        neutrinos: 2
      },
      resultNuclides: {
        selectedElements: null,
        atomicSpin: 2,
        nuclearSpin: 2,
        neutrinos: 2
      }
    });
  };
}
