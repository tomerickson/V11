import { CommonModule, NgForOf } from '@angular/common';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
  WritableSignal
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
import { Observable, Subscription, of, pairwise } from 'rxjs';
import { ResultType } from '../../core/models/result-type';
import { downloadFormValidator } from './download.validator';
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
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit, OnDestroy {
  @Input({ required: true }) data!: any;
  @Input({ required: true }) resultType!: ResultType;
  @Input({ required: true }) ready!: WritableSignal<boolean>;

  readonly fileTypes = [
    { id: 0, name: 'Comma-delimited', extension: '.csv', type: 'text/csv' },
    {
      id: 1,
      name: 'Tab-delimited',
      extension: '.tsv',
      type: 'text/tab-separated-values'
    },
    { id: 2, name: 'Text', extension: '.txt', type: 'text/html' },
    { id: 3, name: 'JSON', extension: '.json', type: 'json/applilcation' },
    { id: 4, name: 'any', extension: '', type: 'text/html' }
  ];

  public get fileLabel() {
    const type =
      this.fileTypes[this.downloadForm.get('fileType')?.value].extension;
    const name = this.downloadForm.get('fileName')?.value;
    return name ? name + type : '';
  }
  title = '';
  url = '';
  format = '';
  hideForm = true;
  subscriptions: Subscription = new Subscription();
  obs!: Observable<Blob>;
  downloadForm!: FormGroup;
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.downloadForm = this.fb.group(
      {
        fileName: ['', Validators.required],
        fileType: [0, [Validators.required, Validators.pattern('^[0-4]$')]],
        dummy: ['']
        // floatLabelControl: this.floatLabelControl
      },
      { validators: downloadFormValidator }
    ) as FormGroup;

    /*     this.subscriptions.add(
      this.downloadForm
        .get('fileName')
        ?.valueChanges.subscribe((fileName) => this.setFileName(fileName))
    );
    this.subscriptions.add(
      this.downloadForm
        .get('fileType')
        ?.valueChanges.pipe(pairwise())
        .subscribe(([prev, next]: [number, number]) =>
          this.setfileExtension([prev, next])
        )
    ); */
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Update the filename extension when
   * the file type is changed.
   * @param param0
   */
  setfileExtension = ([prev, next]: [number, number]) => {
    const fileName = this.downloadForm.get('fileName')?.value;

    if (fileName) {
      const prevExt = this.fileTypes[prev].extension;
      const nextExt = this.fileTypes[next].extension;
      this.downloadForm
        .get('fileName')
        ?.patchValue(fileName.replace(prevExt, nextExt), { emitEvent: false });
    }
  };

  /**
   * Update the file but preserve the extension
   *
   * @param param0
   */
  setFileName = (next: string) => {
    const fileType: number = this.downloadForm.get('fileType')?.value;
    const extension = this.fileTypes[fileType].extension;
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

  showDownload = () => {
    this.hideForm = !this.hideForm;
  };

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  arrayToTsv = (): string => {
    return this.data.map((field: any) => field.join('\t')).join('\n');
  };
  /** Convert a 2D array into a CSV string
   */
  arrayToCsv = (): string => {
    return this.data
      .map(
        (row: any) =>
          row
            .map(String) // convert every value to String
            .map((v: string) => v.replaceAll('"', '""')) // escape double colons
            .map((v: string) => `"${v}"`) // quote it
            .join(',') // comma-separated
      )
      .join('\r\n'); // rows starting on new lines
  };

  /** Download contents as a file
   * Source: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
   */
  downloadBlob = () => {
    // Create a blob

    const fileType: number = this.downloadForm.get('fileType')?.value;
    const contentType = this.fileTypes[fileType].type;
    let blob: Blob;

    switch (+fileType) {
      case 0: // csv
        blob = new Blob([this.arrayToCsv()], { type: contentType });
        break;
      case 1: // tsv
        blob = new Blob([this.arrayToTsv()], { type: contentType });
        break;
      case 2: // json
        blob = new Blob([JSON.stringify(this.data)], { type: contentType });
        break;
      default:
        blob = new Blob([]);
        break;
    }

    this.obs = of(blob);
    this.subscriptions.add(
    this.obs.subscribe((blob) => {
      const pom = document.createElement('a');
      const url = URL.createObjectURL(blob);
      pom.href = url;
      pom.download = this.fileLabel;
      pom.click();
      URL.revokeObjectURL(url);
    }));
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
