import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, input } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { IElementDataModel } from 'src/app/core/models/element-data.model';
import { ElementSelectorRole } from 'src/app/core/models/element-selector-role.model';
@Component({
  selector: 'mfmp-element-picker',
  imports: [MatFormFieldModule, MatSelectModule, MatTooltipModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './element-picker.component.html',
  styleUrl: './element-picker.component.scss'
})
export class ElementPickerComponent {
  formGroupName = input.required<string>();
  controlName = input.required<string>();
  elementsList = input.required<any[] | null>();
  caption = input.required<string>();
  role = input.required<ElementSelectorRole>();

  elementOptionValue = (element: IElementDataModel): string => {
    return this.role() === ElementSelectorRole.query
      ? (element.E + ' - ' + element.EName).padEnd(50)
      : element.E;
  };
}
