import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
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
  FormsModule,
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICascadesAllForm } from 'src/app/core/models/cascades-all-form.model';
import { KeyValuePair } from 'src/app/core/models/key-value-pair.model';
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
    FormsModule,
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
    MatSliderModule,
    MatSlideToggleModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FeedbackOptionsComponent,
    NumericInputComponent,
    SliderInputComponent,
    NgTemplateOutlet
  ]
})
export class CascadesAllFaceComponent implements OnInit, AfterViewInit {
  store = inject(Store);
  fb = inject(FormBuilder);
  ready = signal(false);
  cascadesForm!: FormGroup;

  /**
   * Form getters
   */

  get maxNuclei(): AbstractControl | null {
    return this.cascadesForm.get('maxNuclei');
  }
  get maxLoops(): AbstractControl | null {
    return this.cascadesForm.get('maxLoops');
  }
  get fusionMinEnergy(): AbstractControl | null {
    return this.cascadesForm.get('fusionMinEnergy');
  }
  get twoUpMinEnergy(): AbstractControl | null {
    return this.cascadesForm.get('twoUpMinEnergy');
  }
  get maxReactorTemp(): AbstractControl | null {
    return this.cascadesForm.get('maxReactorTemp');
  }
  get halfLifeThreshold(): AbstractControl | null {
    return this.cascadesForm.get('halfLifeThreshold');
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
  integerPattern: RegExp = /^\d+?$/;
  decimalPattern: RegExp = /^\d+(?:\.\d*)?$/;

  ngOnInit(): void {
    this.buildForm();
  }

  ngAfterViewInit(): void {
    this.ready.set(true);
  }

  buildForm = () => {
    this.cascadesForm = this.fb.group(
      {
        tableSet: new FormControl<string>('Original'),
        maxNuclei: new FormControl(100),
        maxLoops: new FormControl(3),
        maxReactorTemp: new FormControl(2400),
        fusionMinEnergy: new FormControl(5),
        twoUpMinEnergy: new FormControl(5),
        meltingSwitch: new FormControl('Core'),
        boilingSwitch: new FormControl('Include'),
        isotopeSwitch: new FormControl('Include'),
        halfLifeThreshold: new FormControl(18),
        nuclearFermionSwitch: new FormControl('Core'),
        atomicFermionSwitch: new FormControl('Core'),
        dimersSwitch: new FormControl('Include'),
        nuclidesSort: new FormControl('order by Z, A'),
        reactionSort: new FormControl('order by MeV desc'),
        coreQuery: new FormControl("E1 = 'H' and (E2 = 'Ni') "),
        leftElements: new FormControl('left'),
        originalElements: new FormControl('none'),
        rightElements: new FormControl('right')
      },
      { validators: this.formValidator }
    );
  };

  submitForm = () => {
    const form: ICascadesAllForm = this.cascadesForm
      .value as unknown as ICascadesAllForm;
    this.submitter.emit(form);
  };

  handleSliderInputs(kvp: KeyValuePair) {
    this.cascadesForm.get(kvp.key)?.setValue(kvp.value);
  }

  handleFeedback(kvp: any): void {
    // this.cascadesForm.get(kvp.key)?.setValue(kvp.value);
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
    const result = status === 'VALID' ? null : { error: true };
    return result;
  };

  /*   getFormControl = (controlName: string): FormControl => {
    return this.parentForm.controls['cascadesForm']?.get(controlName) as FormControl;
  }

  getFormGroup = (): FormGroup => {
    return this.parentForm.controls[0] as FormGroup;
    let result: FormGroup | undefined;
/*     console.log('getFormGroup:', this.parentForm.controls[formGroupName]);
    if (this.parentForm.controls[formGroupName]) {
      result = this.parentForm.controls[formGroupName] as FormGroup;
    }
    return result; */
}
