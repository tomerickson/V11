import { FormControl, FormGroup } from "@angular/forms";
import { ISpinChoices, SpinChoicesForm } from "./spin-choices.model";

export interface INuclidePicker {
    selectedElements: string[];
    spinChoices: ISpinChoices;
}

export interface NuclidePickerForm {
    selectedElements: FormControl<string[] | null>;
    spinChoices: FormGroup<SpinChoicesForm | null>;
}