import { Component, OnInit } from '@angular/core';
import { EntityCollectionService, EntityCollectionServiceFactory, EntityMetadataMap } from '@ngrx/data';
import { IFusionResultsModel } from '../core/fusion.results.model';
import { MfmpBaseComponent } from '../core/mfmp-base-component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule],
  selector: 'mfmp-fusion',
  templateUrl: './fusion.component.html',
  styleUrls: ['./fusion.component.scss']
})
export class FusionComponent extends MfmpBaseComponent implements OnInit {

  fusionService: EntityCollectionService<IFusionResultsModel>;

  constructor(entityCollecctionServiceFactory: EntityCollectionServiceFactory) {

    super();
    this.pageTitle = ('Fusion Reactions');
    this.pageDescription = (`This program ("Fusion.php") enables SQL commands to query the Fusion tables originally created from Dr Parkhomov's spreadsheets.`);
    
    this.fusionService = entityCollecctionServiceFactory.create<IFusionResultsModel>("FusionResult");
  }

  ngOnInit(): void {

  }

  execute_query() {
    this.fusionService.getAll();
  }
}
