import { Routes } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import { FusionHeadComponent } from "./fusion.head.component";
import * as sto from '../state/fusion';

export const FUSION_ROUTES: Routes = [{
    path: '',
    component: FusionHeadComponent,
    providers: [
        provideState(sto.fusionFeature),
        provideEffects([sto.effects]),
    ],
    children: []
}];