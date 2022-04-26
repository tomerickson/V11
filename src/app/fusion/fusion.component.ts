import { Component, OnInit } from '@angular/core';
import { EntityCollectionService, EntityCollectionServiceFactory } from '@ngrx/data';
import { FusionResultsModel } from '../core/fusion.results.model';
import { MfmpBaseComponent } from '../core/mfmp-base-component';

@Component({
  selector: 'mfmp-fusion',
  templateUrl: './fusion.component.html',
  styleUrls: ['./fusion.component.scss']
})
export class FusionComponent extends MfmpBaseComponent implements OnInit {

  fusionService: EntityCollectionService<FusionResultsModel>;
  constructor(entityCollecctionServiceFactory: EntityCollectionServiceFactory) {

    super();
    this.pageTitle = ('Fusion Reactions');
    this.pageDescription = (`This program ("Fusion.php") enables SQL commands to query the Fusion tables originally created from Dr Parkhomov's spreadsheets.`);
    
    this.fusionService = entityCollecctionServiceFactory.create<FusionResultsModel>("FusionResult");
  }

  ngOnInit(): void {

  }

  execute_query() {
    this.fusionService.getAll();
  }
}
