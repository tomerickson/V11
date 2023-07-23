import {
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Subscription } from 'rxjs';
import { NumericInputComponent } from 'src/app/shared/numeric-input/numeric-input.component';
import { KeyValuePair } from 'src/app/core/models/key-value-pair.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'mfmp-cascades-all-face',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    NumericInputComponent
  ],
  templateUrl: './cascades-all-face.component.html',
  styleUrls: ['./cascades-all-face.component.scss']
})
export class CascadesAllFaceComponent implements OnInit, OnDestroy {
  store = inject(Store);
  fb = inject(FormBuilder);
  cascadesForm!: FormGroup;
  subscriptions!: Subscription;

  feedbackOptions = [
    { name: 'Feedback All', value: 'Include' },
    { name: 'Feedback Core Fuel Only', value: 'Core' },
    { name: 'Feedback None', value: 'Exclude' }
  ];

  errorMessages = [
    { control: '*', error: 'required', message: 'Required entry.' },
    { control: '*', error: 'pattern', message: 'Digits [0-9] only.' },
  ];

  /**
   * Form getters
   */
  get maxNuclei(): number {
    return this.cascadesForm.get('maxNuclei')?.value;
  }
  get maxLoops(): number {
    return this.cascadesForm.get('maxLoops')?.value;
  }
  get meltingSwitch(): string {
    return this.cascadesForm.get('meltingSwitch')?.value;
  }
  get isotopeSwitch(): string {
    return this.cascadesForm.get('isotopeSwitch')?.value;
  }
  get halfLifeThreshold(): string {
    return this.cascadesForm.get('halfLifeThreshold')?.value;
  }
  get nuclearFermionSwitch(): string {
    return this.cascadesForm.get('nuclearFermionSwitch')?.value;
  }
  get atomicFermionSwitch(): string {
    return this.cascadesForm.get('atomicFermionSwitch')?.value;
  }
  get dimersSwitch(): string {
    return this.cascadesForm.get('dimersSwitch')?.value;
  }
  get mouseEntryx(): boolean {
    return this.cascadesForm.get('mouseEntry')?.value;
  }
  mouseEntry = signal(false);

  ngOnInit(): void {
    this.subscriptions = new Subscription();
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  buildForm = () => {
    this.cascadesForm = this.fb.group({
      tableSet: new FormControl<string>('Original'),
      maxNuclei: [100, [Validators.required, Validators.pattern('^[0-9]+$')]],
      maxLoops: [3, [Validators.pattern('^[0-9]+$')]],
      maxReactorTemp: [2400, [Validators.pattern('^[0-9]+$')]],
      meltingSwitch: ['Core'],
      boilingSwitch: ['Include'],
      fusionMinEnergy: [5, [Validators.pattern('^[0-9]+$')]],
      twoUpMinEnergy: [5, Validators.pattern('^[0-9]+$')],
      isotopeSwitch: ['Include'],
      halfLifeThreshold: [18, [Validators.pattern('^[0-9]+$')]],
      nuclearFermionSwitch: ['Core'],
      atomicFermionSwitch: ['Core'],
      dimersSwitch: ['Include'],
      nuclidesSort: ['order by Z, A'],
      reactionSort: ['order by MeV desc'],
      coreQuery: ['E1 = \'H\' and (E2 = \'Ni\') '],
      leftElements: ['left'],
      originalElements: ['none'],
      rightElements: ['right'],
      mouseEntry: new FormControl(true)
    });
    this.mouseEntry = signal(this.cascadesForm.get('mouseEntry')?.value);
    this.subscriptions.add(
      this.cascadesForm.valueChanges.subscribe((values) =>
        this.handleFormChanges(values)
      )
    );
  };

  handleFormChanges = (changes: any): void => {
    this.mouseEntry.mutate((vlu) => (changes.mouseEntry = vlu));
    console.log('mouseEntry', this.mouseEntry());
  };

  handleNumericInputs(kvp: KeyValuePair) {
    this.cascadesForm.get(kvp.key)?.setValue(kvp.value);
  }
  
  sliderChange() {
    const value = this.mouseEntry();
    this.mouseEntry.set(!value);
  }
  hasError = (controlName: string, errorName: string) => {
    return this.cascadesForm.controls[controlName].hasError(errorName);
  };

  /**
   * Look for a matching error message:
   * 
   */
  errorMessage = (controlName: string, errorName: string): string => {
    const errs = this.errorMessages
      .filter(
        (msg) =>
          (msg.control === controlName || msg.control === '*') &&
          msg.error === errorName
      )
      .sort((a, b) =>
        a.control < b.control ? 1 : a.control > b.control ? -1 : 0
      );
      console.log('errs', errs);
    return errs[0].message;
  }
}
