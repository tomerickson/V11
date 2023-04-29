/* import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, merge, switchMap, tap } from 'rxjs';

interface IFusionState {
  ready: boolean;
  tableSet: string;
  coreQuery: string;
  resultLimit: number;
  leftNuclides: {
    selectedElements: string[];
    atomicSpin: number;
    nuclearSpin: number;
    neutrinos: number;
  };
  rightNuclides: {
    selectedElements: string[];
    atomicSpin: number;
    nuclearSpin: number;
    neutrinos: number;
  };
  resultNuclides: {
    selectedElements: string[];
    atomicSpin: number;
    nuclearSpin: number;
    neutrinos: number;
  };
}

interface IFusionComponentState {
  fusionState: IFusionState;
}

const defaultFusionState = {
  fusionState: {
    ready: false,
    tableSet: '',
    coreQuery: '',
    resultLimit: 1000,
    leftNuclides: {
      selectedElements: [],
      atomicSpin: 2,
      nuclearSpin: 2,
      neutrinos: 2
    },
    rightNuclides: {
      selectedElements: [],
      atomicSpin: 2,
      nuclearSpin: 2,
      neutrinos: 2
    },
    resultNuclides: {
      selectedElements: [],
      atomicSpin: 2,
      nuclearSpin: 2,
      neutrinos: 2
    }
  }
};

@Injectable()
export class FusionComponentStore extends ComponentStore<IFusionComponentState> {
  
    state$ = this.select((s) => s);

    constructor() {
    super(defaultFusionState);
  }

  readonly syncState = this.effect((formGroup$: Observable<FormGroup>) => {
    return formGroup$.pipe(
        switchMap((formGroup: FormGroup) => {
            const syncValuesFromGroup = formGroup.valueChanges.pipe(
                tapResponse(
                    (value) => {
                        this.setValues(value);
                    },
                    (error) => {
                        console.error('Error syncing state', error);
                    }
                )
            );

            const syncValuesToGroup = this.state$.pipe(
                tap((state) => {state.fusionState() 

                })
            );

            return merge(syncValuesFromGroup, syncValuesToGroup);            
  }));


  this.setValues(formGroup: FormGroup) => {
    this.setState((state) => {
        return {...state, fusionState: {state.}}
    })

  }
})
}
 */