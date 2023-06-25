import { FormControl } from "@angular/forms";

export interface ISpinChoices {
    atomicBosons: boolean;
    atomicFermions: boolean;
    nuclearBosons: boolean;
    nuclearFermions: boolean;
}
export interface SpinChoicesForm {
    atomicBosons: FormControl<boolean | null>;
    atomicFermions: FormControl<boolean | null>;
    nuclearBosons: FormControl<boolean | null>;
    nuclearFermions: FormControl<boolean | null>;
  }