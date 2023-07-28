import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
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
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Subscription } from 'rxjs';
import { NumericInputComponent } from 'src/app/shared/numeric-input/numeric-input.component';
import { KeyValuePair } from 'src/app/core/models/key-value-pair.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ICascadesAllForm } from 'src/app/core/models/cascades-all-form.model';

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
    MatTooltipModule,
    ReactiveFormsModule,
    NumericInputComponent
  ],
  templateUrl: './cascades-all-face.component.html',
  styleUrls: ['./cascades-all-face.component.scss'],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } }]
})
export class CascadesAllFaceComponent implements OnInit, OnDestroy {
  store = inject(Store);
  fb = inject(FormBuilder);
  cascadesForm!: FormGroup;
  subscriptions!: Subscription;

  feedbackOptions = [
    { name: 'Feedback All', value: 'Include' },
    { name: 'Core Fuel Only', value: 'Core' },
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
  get maxReactorTemp(): number {
    return this.cascadesForm.get('maxReactorTemp')?.value;
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
  get coreQuery(): boolean {
    return this.cascadesForm.get('coreQuery')?.value;
  }
  mouseEntry = signal(false);

  @Output() submitter: EventEmitter<ICascadesAllForm> = new EventEmitter();

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

    this.subscriptions.add(
      this.cascadesForm.valueChanges.subscribe((values) =>
        this.handleFormChanges(values)
      )
    );
  };

  submitForm = () => {
    const form: ICascadesAllForm = this.cascadesForm.value as unknown as ICascadesAllForm;
    this.submitter.emit(form);
  }
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
