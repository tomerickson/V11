import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  signal
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ICascadesAllForm } from 'src/app/core/models/cascades-all-form.model';
import { KeyValuePair } from 'src/app/core/models/key-value-pair.model';
import { ILookupDataModel } from 'src/app/core/models/lookup-data.model';
import { NumericInputComponent } from 'src/app/shared/numeric-input/numeric-input.component';
import { ProgressSpinnerComponent } from 'src/app/shared/progress-spinner/progress-spinner.component';

@Component({
  selector: 'mfmp-cascades4-face',
  standalone: true,
  imports: [
    CommonModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    ReactiveFormsModule,
    ProgressSpinnerComponent,
    NumericInputComponent
  ],
  templateUrl: './cascades4-face.component.html',
  styleUrls: ['./cascades4-face.component.scss']
})
export class Cascades4FaceComponent implements OnInit {
  @Input({ required: true }) form!: ICascadesAllForm | null;
  @Input({ required: true }) loading!: boolean | null;
  @Input({ required: true }) feedbackOptions!: ILookupDataModel[] | null;
  @Output() submitter = new EventEmitter<ICascadesAllForm>();

  store = inject(Store);
  fb = inject(FormBuilder);
  cascadesForm!: FormGroup;
  subscriptions!: Subscription;

  errorMessages = [
    { control: '*', error: 'required', message: 'Required entry.' },
    { control: '*', error: 'pattern', message: 'Digits [0-9] only.' }
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
      coreQuery: ["E1 = 'H' and (E2 = 'Ni') "],
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
  // loadResults = () => {
  //   this.submitter.emit(this.form?.resultsLink);
  // };

  sliderChange() {
    const value = this.mouseEntry();
    this.mouseEntry.set(!value);
  }

  submitForm = () => {
    const form: ICascadesAllForm = this.cascadesForm
      .value as unknown as ICascadesAllForm;
    this.submitter.emit(form);
  };

  handleFormChanges = (changes: any): void => {
    this.mouseEntry.mutate((vlu) => (changes.mouseEntry = vlu));
    console.log('mouseEntry', this.mouseEntry());
  };

  handleNumericInputs(kvp: KeyValuePair) {
    this.cascadesForm.get(kvp.key)?.setValue(kvp.value);
  }

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
  };
}
