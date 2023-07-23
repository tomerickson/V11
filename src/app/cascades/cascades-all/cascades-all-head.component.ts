import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CascadesAllFaceComponent } from './cascades-all-face.component';
import { HeaderProviderService } from 'src/app/shared/header/header.provider.service';

@Component({
    selector: 'mfmp-cascades-all-head',
    standalone: true,
    template: `<mfmp-cascades-all-face></mfmp-cascades-all-face>`,
    styles: [],
    imports: [CommonModule, CascadesAllFaceComponent],
    providers:  [{ provide: HeaderProviderService }]
})
export class CascadesAllHeadComponent implements OnInit {

    headerService = inject(HeaderProviderService);

    ngOnInit(): void {
            this.headerService.buildPageHeader('cascades-all');
    }

}
