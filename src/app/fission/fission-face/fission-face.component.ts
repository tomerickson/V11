import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { IElementDataModel } from 'src/app/core/models/element-data.model';
import { ILookupDataModel } from 'src/app/core/models/lookup.-data.model';

@Component({
  selector: 'mfmp-fission-face',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatExpansionModule],
  templateUrl: './fission-face.component.html',
  styleUrls: ['./fission-face.component.scss'],
  viewProviders: [MatExpansionPanel]
})
export class FissionFaceComponent {

  
  @Input({ required: true }) elements!: IElementDataModel[] | null;
  @Input({ required: true }) sortFields!: ILookupDataModel[] | null;
  @Output() doit: EventEmitter<FormGroup[]> = new EventEmitter<FormGroup[]>();
  
    description = 'This program ("Fission.php") enables SQL commands to query the Fission tables created from Dr Parkhomov\'s spreadsheets.';
}
