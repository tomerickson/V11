import { NgModule } from "@angular/core";
import { EntityDefinitionService } from "@ngrx/data";
import { SharedModule } from "../shared/shared.module";
import { fusionEntityMetaData } from "./fusion-entity-metadata";
import { FusionRoutingModule } from "./fusion-routing.module";
import { FusionComponent } from "./fusion.component";

@NgModule({

    imports: [
        SharedModule,
        FusionRoutingModule,
    ],
    declarations: [
        FusionComponent
    ]
})

export class FusionModule {

    constructor(entityDefService: EntityDefinitionService) {
        entityDefService.registerMetadataMap(fusionEntityMetaData);
    }
 }