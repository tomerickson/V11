import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { Observable } from 'rxjs';
import { IElementDataModel } from '../core/element.data.model';
import { MfmpBaseComponent } from '../core/mfmp-base-component';
import { NuclidePickerComponent } from '../shared/nuclide-picker.component';
import { PageActions } from '../state/global.actions';
import { globalFeature } from '../state/global.state';

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
    NuclidePickerComponent,
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
