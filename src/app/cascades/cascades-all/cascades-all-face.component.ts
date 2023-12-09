import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
  signal
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormControlStatus,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  MatFormFieldModule
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ICascadesAllForm } from 'src/app/core/models/cascades-all-form.model';
import { IKeyValuePair, KeyValuePair } from 'src/app/core/models/key-value-pair.model';
import { ILookupDataModel } from 'src/app/core/models/lookup-data.model';
import { FeedbackOptionsComponent } from 'src/app/shared/feedback-options/feedback-options.component';
import { NumericInputComponent } from 'src/app/shared/numeric-input/numeric-input.component';
import { SliderInputComponent } from 'src/app/shared/slider-input/slider-input.component';

@Component({
  selector: 'mfmp-cascades-all-face',
  standalone: true,
  templateUrl: './cascades-all-face.component.html',
  styleUrls: ['./cascades-all-face.component.scss'],
  imports: [
    CommonModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    ReactiveFormsModule,
    NumericInputComponent,
    FeedbackOptionsComponent,
    SliderInputComponent
  ]
})
export class CascadesAllFaceComponent implements OnInit, OnDestroy {
  store = inject(Store);
  fb = inject(FormBuilder);
  ready = signal(false);
  cascadesForm!: FormGroup;
  subscriptions!: Subscription;

  numericErrorMessages: Record<string,string> = {
    required: 'This field is required.',
    pattern: 'Digits [0-9] only.',
    range: 'Out of range.'
     };

  /**
   * Form getters
   */
  get maxNuclei(): number {
    return this.cascadesForm.get('maxNuclei')?.value;
  }
  get maxLoops(): number {
    return this.cascadesForm.get('maxLoops')?.value;
  }
  get fusionMinEnergy(): number {
    return this.cascadesForm.get('fusionMinEnergy')?.value;
  }
  get twoUpMinEnergy(): number {
    return this.cascadesForm.get('twoUpMinEnergy')?.value;
  }
  get meltingSwitch(): string {
    return this.cascadesForm.get('meltingSwitch')?.value;
  }
  get boilingSwitch(): string {
    return this.cascadesForm.get('boilingSwitch')?.value;
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

  @Input({ required: true }) feedbackOptions!: Observable<ILookupDataModel[]>;
  @Output() submitter: EventEmitter<ICascadesAllForm> = new EventEmitter();

  /** Tooltip support
   *
   */
  touchMessage = `Enabling mouse/touch entry will replace textboxes with sliders on range-bound controls.`;
  tablesMessage = `Choose the working Fusion and 2-2 set of tables between the
  Original (Parkhomov, MeV > 0.0: FusionAll and TwoToTwoAll) and the
  Extended (MeV = +/- 0.0: FusionAllPlus and TwoToTwoAllPlus). (note
  that either set will use the NuclidesPlus and the ElementsPlus
  reference tables)`;
  patienceMessage = `NB: This program may take up to 20 minutes to run - be patient.
   BUT, even if it eventually shows an error message, still check out the All Results page:
    the answer file (check dates and times) may yet be there and complete.`;
  tooltipDelay = 750;

  ngOnInit(): void {
    this.subscriptions = new Subscription();
    this.buildForm();
    this.ready.set(true);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  buildForm = () => {
    this.cascadesForm = this.fb.group(
      {
        tableSet: new FormControl<string>('Original'),
        maxNuclei: new FormControl([100, [Validators.required, Validators.pattern('^[0-9]+$')]]),
        maxLoops: [3, [Validators.required, Validators.pattern('^[0-9]+$')]],
        maxReactorTemp: [
          2400,
          [Validators.required, Validators.pattern('^[0-9]+$')]
        ],
        meltingSwitch: ['Core'],
        boilingSwitch: ['Include'],
        fusionMinEnergy: [
          5,
          [Validators.required, Validators.pattern('^[0-9]+$')]
        ],
        twoUpMinEnergy: [
          5,
          [Validators.required, Validators.pattern('^[0-9]+$')]
        ],
        isotopeSwitch: ['Include'],
        halfLifeThreshold: [
          18,
          [Validators.required, Validators.pattern('^[0-9]+$')]
        ],
        nuclearFermionSwitch: ['Core'],
        atomicFermionSwitch: ['Core'],
        dimersSwitch: ['Include'],
        nuclidesSort: ['order by Z, A'],
        reactionSort: ['order by MeV desc'],
        coreQuery: ["E1 = 'H' and (E2 = 'Ni') "],
        leftElements: ['left'],
        originalElements: ['none'],
        rightElements: ['right']
      },
      { validators: this.formValidator }
    );

    this.subscriptions.add(
      this.cascadesForm.valueChanges.subscribe((values) =>
        this.handleFormChanges(values)
      )
    );
  };

  submitForm = () => {
    const form: ICascadesAllForm = this.cascadesForm
      .value as unknown as ICascadesAllForm;
    this.submitter.emit(form);
  };
  handleFormChanges = (changes: any): void => {
    // this.mouseEntry.set((vlu) => (changes.mouseEntry = vlu));
    // console.log('status', this.cascadesForm.status);
  };

  handleNumericInputs(kvp: KeyValuePair) {
    this.cascadesForm.get(kvp.key)?.setValue(kvp.value);
  }

  handleFeedback(kvp: IKeyValuePair): void {
    this.cascadesForm.get(kvp.key)?.setValue(kvp.value);
  }

  sliderChange() {
    this.mouseEntry.set(!this.mouseEntry());
  }
  hasError = (controlName: string, errorName: string) => {
    return this.cascadesForm.controls[controlName].hasError(errorName);
  };

  formValidator: ValidatorFn = (
    form: AbstractControl
  ): ValidationErrors | null => {
    const status: FormControlStatus = (form as FormGroup).status;
    const result = (status === 'VALID') ? null : { error: true };
    console.log('form.status', status);
    return result;
  };
}
