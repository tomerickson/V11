import { Component, OnInit, inject } from '@angular/core';
import { IFusionResultsModel } from '../core/fusion.results.model';
import { MfmpBaseComponent } from '../core/mfmp-base-component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { globalFeature } from '../state/global.state';
import { PageActions } from '../state/global.actions';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';
import { ParticlePickerComponent } from '../shared/particle-picker.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinPickerComponent } from '../shared/spin-picker.component';
import { MatRadioModule } from '@angular/material/radio';
import { IElementDataModel } from '../core/element.data.model';

@Component({
  standalone: true,
  selector: 'mfmp-fusion',
  templateUrl: './fusion.component.html',
  styleUrls: ['./fusion.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatGridListModule,
    MatRadioModule,
    ParticlePickerComponent,
    SpinPickerComponent,
    ReactiveFormsModule
  ]
})
export class FusionComponent extends MfmpBaseComponent implements OnInit {
  fb: FormBuilder = inject(FormBuilder);
  fusionForm!: FormGroup;
  elements!: Observable<IElementDataModel[]>;

  execute_query(): void {
    //this.fusionService.getAll();
  }

  constructor() {
    super();
  }

  ngOnInit(): void {

    this.buildForm();
    this.pageTitle = this.store.select(globalFeature.selectPageTitle);
    this.pageDescription = this.store.select(
      globalFeature.selectPageDescription
    );
    this.elements = this.store.select(globalFeature.selectElements);

    this.store.dispatch(
      PageActions.setPageTitle({ title: 'Fusion Reactions' })
    );
    this.store.dispatch(
      PageActions.setPageDescription({
        description: `This program ("Fusion.php") enables SQL 
        commands to query the Fusion tables originally created 
        from Dr Parkhomov's spreadsheets.`
      })
    );
  }

  buildForm = () => {
    this.fusionForm = this.fb.group({
      fileSet: new FormControl(''),
      coreQuery: new FormControl(''),
      leftNuclides: this.fb.group({
        selectedElements: new FormControl(''),
        atomicSpin: new FormControl(''),
        nuclearSpin: new FormControl('')
      }),
      rightNuclides: this.fb.group({
        selectedElements: new FormControl(''),
        atomicSpin: new FormControl(''),
        nuclearSpin: new FormControl('')
      }),
      resultNuclides: this.fb.group({
        selectedElements: new FormControl(''),
        atomicSpin: new FormControl(''),
        nuclearSpin: new FormControl('')
      })
    });
  }

}
