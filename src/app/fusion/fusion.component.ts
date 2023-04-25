import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IElementDataModel } from '../core/element.data.model';
import { MfmpBaseComponent } from '../core/mfmp-base-component';
import { NuclidePickerComponent } from '../shared/nuclide-picker/nuclide-picker.component';
import { PageActions } from '../state/global.actions';
import { globalFeature } from '../state/global.state';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
    MatRadioModule,
    NuclidePickerComponent,
    ReactiveFormsModule
  ]
})
export class FusionComponent extends MfmpBaseComponent implements OnInit, OnDestroy {

  fb: FormBuilder = inject(FormBuilder);
  fusionForm!: FormGroup;
  leftNuclides!: FormGroup;
  rightNuclides!: FormGroup;
  resultNuclides!: FormGroup;
  elements!: Observable<IElementDataModel[]>;
  ready: BehaviorSubject<boolean> = new BehaviorSubject(false);
  subscriptions: Subscription = new Subscription();

  execute_query(): void {
    //this.fusionService.getAll();
  }

  constructor() {
    super();
  }
  ngOnDestroy(): void {

    this.subscriptions.unsubscribe();
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
    this.ready.next(true);
  }

  buildForm = () => {


      // this.leftNuclides = this.fb.group({
      //   selectedElements: new FormControl(''),
      //   atomicSpin: new FormControl(''),
      //   nuclearSpin: new FormControl(''),
      //   neutrinos: new FormControl('')
      // });
      // this.rightNuclides = this.fb.group({
      //   selectedElements: new FormControl(''),
      //   atomicSpin: new FormControl(''),
      //   nuclearSpin: new FormControl(''),
      //   neutrinos: new FormControl('')
      // });
      // this.resultNuclides = this.fb.group({
      //   selectedElements: new FormControl(''),
      //   atomicSpin: new FormControl(''),
      //   nuclearSpin: new FormControl(''),
      //   neutrinos: new FormControl('')
      // });
      // this.fusionForm = this.fb.group({
      //   tableSet: new FormControl(''),
      //   coreQuery: new FormControl(''),
      //   leftNuclides: this.leftNuclides,
      //   rightNuclides: this.rightNuclides,
      //   resultNuclides: this.resultNuclides
      // }); 
      this.fusionForm = this.fb.group({
        tableSet: new FormControl(''),
        coreQuery: new FormControl(''),
        leftNuclides: this.fb.group({
          selectedElements: new FormControl(''),
          atomicSpin: new FormControl(''),
          nuclearSpin: new FormControl(''),
          neutrinos: new FormControl('')
        }),
        rightNuclides: this.fb.group({
          selectedElements: new FormControl(''),
          atomicSpin: new FormControl(''),
          nuclearSpin: new FormControl(''),
          neutrinos: new FormControl('')
        }),
        resultNuclides: this.fb.group({
          selectedElements: new FormControl(''),
          atomicSpin: new FormControl(''),
          nuclearSpin: new FormControl(''),
          neutrinos: new FormControl('')
        })
      }); 
    this.subscriptions.add(this.fusionForm.valueChanges.subscribe(data => console.log(data)));
  }

  resetForm = () => this.fusionForm.reset();

}

declare class FusionForm {
  tableSet: AbstractControl;
  coreQuery: AbstractControl;
}
