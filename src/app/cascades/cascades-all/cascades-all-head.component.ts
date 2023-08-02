import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CascadesAllFaceComponent } from './cascades-all-face.component';
import { HeaderProviderService } from 'src/app/shared/header/header.provider.service';
import { ICascadesAllForm } from 'src/app/core/models/cascades-all-form.model';
import { Store } from '@ngrx/store';
import * as featureStore from '../../state/cascades-all';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'mfmp-cascades-all-head',
    standalone: true,
    template: `<mfmp-cascades-all-face
    (submitter)="submitForm($event)"></mfmp-cascades-all-face>`,
    styles: [],
    imports: [CommonModule, CascadesAllFaceComponent],
    providers:  [{ provide: HeaderProviderService }]
})
export class CascadesAllHeadComponent implements OnInit {

    store = inject(Store);
    router = inject(Router);
    activatedRoute = inject(ActivatedRoute);
    headerService = inject(HeaderProviderService);

    ngOnInit(): void {
            this.headerService.buildPageHeader('cascades-all');
    }
    
    submitForm(form: ICascadesAllForm) {
        this.store.dispatch(featureStore.CascadesAllActions.requestAllResults({payload: form}));
        this.router.navigate(['summary'], {relativeTo: this.activatedRoute});
    }
}
