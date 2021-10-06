import { NgModule } from "@angular/core";
import { FusionRoutingModule } from "./fusion-routing.module";
import { FusionComponent } from "./fusion.component";


@NgModule({

    imports: [
        FusionRoutingModule
    ],
    declarations: [
        FusionComponent
    ]
})

export class FusionModule { }