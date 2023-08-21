import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IElementDataModel } from '../core/models/element-data.model';
import { ElementDataResultsModel } from '../core/models/element-data-results.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'mfmp-element-data-face',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  templateUrl: './element-data-face.component.html',
  styleUrls: ['./element-data-face.component.scss']
})
export class ElementDataFaceComponent implements OnInit {
  fb = inject(FormBuilder);
  f!: FormGroup;

  elementData!: MatTableDataSource<string | number>;
  nuclideData!: MatTableDataSource<string | number>;
  radioNuclideData!: MatTableDataSource<string | number>;
  elementColumns!: string[];
  nuclideColumns!: string[];
  radioNuclideColumns!: string[];

  @Input({ required: true }) elementList!: IElementDataModel[] | null;
  @Input({ required: true })
  results!: Observable<ElementDataResultsModel | null>;

  @Input({ required: true }) set elements(value: any[] | null) {
    if (value && value.length > 0) {
      this.elementData = new MatTableDataSource();
      this.elementData.data = this.objectify(value);
      this.elementColumns = value[0];
    }
  }

  @Input({ required: true }) set nuclides(value: any[] | null) {
    if (value && value.length > 0) {
      this.nuclideData = new MatTableDataSource();
      this.nuclideData.data = this.objectify(value);
      this.nuclideColumns = value[0];
    }
  }

  @Input({ required: true }) set radioNuclides(value: any[] | null) {
    if (value && value.length > 0) {
      this.radioNuclideData = new MatTableDataSource();
      this.radioNuclideData.data = this.objectify(value);
      this.radioNuclideColumns = value[0];
    }
  }

  @Output() change: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.f = this.fb.group({
      doit: ['get_element'],
      ZKEY: ['1', Validators.required]
    });
  }

  postChange(event: MatOptionSelectionChange) {
    if (event.isUserInput) this.change.emit(event.source.value);
  }

  stringify = (object: any) => {
    return JSON.stringify(object);
  };

  objectify = (block: any[]): any[] => {
    type tuple = {
      [key: string]: any;
    };
    const header: string[] = [...block[0]];
    let objects: tuple[] = [];
    for (let i = 1; i < block.length; i++) {
      let row: any[] = block[i];
      let object: tuple = {};
      for (let j = 0; j < header.length; j++) {
        object[header[j]] = row[j];
      }
      objects.push(object);
    }
    console.table(objects);
    return objects;
  };
}
