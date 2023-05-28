import { CommonModule, NgForOf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
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
import { Subscription, pairwise } from 'rxjs';
import { ResultType } from '../../core/models/result-type';
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

  @Input({ required: true }) data: any;
  @Input({ required: true }) resultType!: ResultType;

  readonly fileTypes = [
    {name: "Comma-delimited", extension: ".csv", type: "text/csv"},
    {name: "Tab-delimited", extension: ".tsv", type: "text/tsv"},
    {name: "Text", extension: ".txt", type: "text/html"},
    {name: "JSON", extension: ".csv", type: "json/applilcation"},
];

  title = '';
  url = '';
  format = '';
  hideForm = true;
  subscriptions: Subscription = new Subscription();

  downloadForm!: FormGroup;
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  fb = inject(FormBuilder);

  ngOnInit(): void {

    this.downloadForm = this.fb.group({
      fileName: [this.resultType, Validators.required],
      fileType: ['', [Validators.required, Validators.pattern('^[0-2]$')]],
      floatLabelControl: this.floatLabelControl
    }) as FormGroup;
    this.subscriptions.add(this.downloadForm.valueChanges
      .pipe(pairwise())
      .subscribe(([prev, next]) => this.setFileName([prev, next])));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  setFileName = ([prev, next]:[any, any]) => {
    console.log(prev, next);
  }
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
    return this.data.map((field:any) => field.join("\t")).join("\n");
  }
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
    const fileName = this.downloadForm.get('fileName')?.value + this.fileTypes[fileType].extension;
    const contentType = this.fileTypes[fileType].type;
    let blob: Blob;

    switch (fileType) {
      case 0: // csv
        blob = new Blob([this.arrayToCsv()], {type: contentType});
        break;
      case 1: // tsv
        blob = new Blob([this.arrayToTsv()], {type: contentType});
        break;
      case 2: // json
        blob = new Blob([JSON.stringify(this.data)], {type: contentType});
        break;
      default:
        blob = new Blob([]);
        break;
    }
    const url = URL.createObjectURL(blob);

    // Create a link to download it
    const pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', fileName);
    pom.click();
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
