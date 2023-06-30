import { CommonModule, NgForOf } from '@angular/common';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  WritableSignal,
  computed,
  inject,
  signal
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  FloatLabelType,
  MatFormFieldModule
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';
import {
  Downloadable,
  downloadOptions
} from 'src/app/core/models/downloadable.model';
import { ResultType } from '../../core/models/result-type';
import { downloadFormValidator } from './download.validator';
import { DownloadService } from './download.service';

@Component({
  selector: 'mfmp-download',
  standalone: true,
  imports: [
    NgForOf,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
  providers: [DownloadService]
})
export class DownloadComponent implements OnInit, OnDestroy {
  @Input({ required: true }) data!: any;
  @Input({ required: true }) resultType!: ResultType;
  @Input({ required: true }) ready!: WritableSignal<boolean>;

  subscriptions: Subscription;

  title = '';
  url = '';
  format = '';

  /*   get fileName() {
    return this.downloadForm.get('fileName')?.value ?? '';
  }
  get fileExt() {
    return this.downloadForm.get('fileType')?.value.extension ?? '';
  } */
  showForm = signal(false);
  goodForm = signal(false);
  fileNameSignal = signal('');
  fileExtSignal = signal<Downloadable | null>(null);
  fullNameSignal = computed(() => {
    const name = this.fileNameSignal();
    const ext = this.fileExtSignal()?.extension || '';
    let result: string;
    if (name.length > 0 && ext.length > 0) result = name + ext;
    else if (ext.length == 0) result = name;
    else result = '';
    return result;
  });
  downloadForm!: FormGroup;
  downloadOptions: Downloadable[] = downloadOptions;
  floatLabelControl = new FormControl('auto' as FloatLabelType);

  fb = inject(FormBuilder);
  downloadService = inject(DownloadService);

  constructor() {
    this.subscriptions = new Subscription();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.downloadForm = this.fb.group(
      {
        fileName: ['', Validators.required],
        fileType: [null, Validators.required],
        dummy: ['']
        // floatLabelControl: this.floatLabelControl
      },
      { validators: downloadFormValidator }
    ) as FormGroup;

    this.subscriptions.add(
      this.downloadForm
        .get('fileType')
        ?.valueChanges.subscribe((option) => this.fileExtSignal.set(option))
    );
    this.subscriptions.add(
      this.downloadForm
        .get('fileName')
        ?.valueChanges.subscribe((option) => this.fileNameSignal.set(option))
    );
    this.subscriptions.add(
      this.downloadForm.statusChanges.subscribe((status) =>
        this.goodForm.set(status === 'VALID')
      )
    );
  }

  /**
   * Update the filename extension when
   * the file type is changed.
   * @param param0
   */
  setfileExtension = (value: Downloadable) => {
    const newExtension = value.extension;
    let fileName = this.downloadForm.get('fileName')?.value;

    if (fileName) {
      const column = fileName.indexOf('.', -1);
      if (column >= 0) {
        const oldExtension = fileName.substring(column);
        fileName.replace(oldExtension, newExtension);
      } else {
        fileName += newExtension;
      }
      this.downloadForm
        .get('fileName')
        ?.patchValue(fileName, { emitEvent: false });
    }
  };

  /**
   * Update the file but preserve the extension
   *
   * @param param0
   */
  setFileName = (next: string) => {
    const fileType: number = this.downloadForm.get('fileType')?.value;
    const extension = this.downloadOptions[fileType].extension;
    let fileName: string;
    if (extension !== '') {
      const column = next.indexOf('.', -1);
      if (column > 0) {
        fileName = next.substring(0, column - 1);
      } else {
        fileName = next;
      }
      fileName += extension;
      this.downloadForm
        .get('fileName')
        ?.patchValue(fileName, { emitEvent: false });
    }
  };

  onFileInput = ($event: Event) => {
    console.log($event);
    $event.stopPropagation();
  };

  toggleDownload = () => {
    this.showForm.set(!this.showForm());
  };

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  downloadBlob = () => {
    const fileType: Downloadable = this.downloadForm.get('fileType')?.value;
    this.downloadService.downloadBlob(
      fileType,
      this.data,
      this.fullNameSignal()
    );
  };
}

export class DownloadLabels {
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl
  });

  constructor(private _formBuilder: FormBuilder) {}

  // getFloatLabelValue(): FloatLabelType {
  //   return this.floatLabelControl.value || 'auto';
  // }
}
