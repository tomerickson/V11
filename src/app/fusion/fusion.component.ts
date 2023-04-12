import { Component, OnInit } from '@angular/core';
// import { EntityCollectionService, EntityCollectionServiceFactory } from '@ngrx/data';
import { IFusionResultsModel } from '../core/fusion.results.model';
import { MfmpBaseComponent } from '../core/mfmp-base-component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { globalFeature } from '../state/global.state';
import { PageActions } from '../state/global.actions';
import { Observable } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';
import { ParticlePickerComponent } from "../particle-picker/particle-picker.component";

@Component({
    standalone: true,
    selector: 'mfmp-fusion',
    templateUrl: './fusion.component.html',
    styleUrls: ['./fusion.component.scss'],
    imports: [CommonModule, MatCardModule, MatExpansionModule, ParticlePickerComponent]
})
export class FusionComponent extends MfmpBaseComponent implements OnInit {
  execute_query() {
    //this.fusionService.getAll();
  }
  ngOnInit(): void {
    this.pageTitle = this.store.select(globalFeature.selectPageTitle);
    this.pageDescription = this.store.select(
      globalFeature.selectPageDescription
    );
    this.store.dispatch(
      PageActions.setPageTitle({ title: 'Fusion Reactions' })
    );
    this.store.dispatch(
      PageActions.setPageDescription({
        description: `This program ("Fusion.php") enables SQL 
        commands to query the Fusion tables originally created 
        from Dr Parkhomov's spreadsheets.`
      })
    );
  }
}
