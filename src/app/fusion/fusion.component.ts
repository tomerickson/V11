import { Component, OnInit, inject } from '@angular/core';
import { IFusionResultsModel } from '../core/fusion.results.model';
import { MfmpBaseComponent } from '../core/mfmp-base-component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { globalFeature } from '../state/global.state';
import { PageActions } from '../state/global.actions';
import { Observable } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';
import { ParticlePickerComponent } from '../shared/particle-picker.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'mfmp-fusion',
  templateUrl: './fusion.component.html',
  styleUrls: ['./fusion.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatGridListModule,
    ParticlePickerComponent,
    ReactiveFormsModule
  ]
})
export class FusionComponent extends MfmpBaseComponent implements OnInit {

  fb: FormBuilder = inject(FormBuilder);
  fusionForm: FormGroup;

  execute_query() {
    //this.fusionService.getAll();
  }

  constructor() {
    super();
    this.fusionForm = this.fb.group({})
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
