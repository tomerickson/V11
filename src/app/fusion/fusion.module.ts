import { NgModule } from "@angular/core";
import { FusionRoutingModule } from "./fusion-routing.module";
import { FusionComponent } from "./fusion.component";
import { StoreModule } from '@ngrx/store';
import { SharedModule } from "../shared/shared.module";
import * as fromFusion from './reducers';


@NgModule({

    imports: [
        SharedModule,
        FusionRoutingModule,
        StoreModule.forFeature(fromFusion.fusionFeatureKey, fromFusion.reducers, { metaReducers: fromFusion.metaReducers })
    ],
    declarations: [
        FusionComponent
    ]
})

export class FusionModule { }