import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ICascadesAllForm } from '../core/models/cascades-all-form.model';
import { CrudService } from '../core/services/crud.service';
import {
  getFormDataString,
  stringifyFormData
} from '../core/services/helpers';
@Injectable({
  providedIn: 'root'
})
export class CascadesService {

  crud: CrudService = inject(CrudService);

  cascadesAllPage = 'CascadesAll.php';
  constructor() {}

  getCascadesAllResults = (form: ICascadesAllForm): Observable<string> => {
    const request: FormData = this.asCascadesAllFormData(form);
    const formString = stringifyFormData(request); 
    return this.crud.postPage(this.cascadesAllPage, formString);
  };

  parseCascadesAllResults = (html: string): string => {
    // TODO:
    //
    return 'link';
  };

  asFormDataString = (input: any): string => {
    return getFormDataString(input);
  };

  asCascadesAllFormData = (input: ICascadesAllForm): FormData => {
    const form = new FormData();
    form.append('doit', "execute_query")
    form.append('table_set', input.tableSet);
    form.append('max_nuclei', String(input.maxNuclei));
    form.append('max_loops', String(input.maxLoops));
    form.append('max_reactor_temp', String(input.maxReactorTemp));
    form.append('Melting_switch', input.meltingSwitch);
    form.append('Boiling_switch', input.boilingSwitch);
    form.append('min_MeV_F', String(input.fusionMinEnergy));
    form.append('min_MeV_T', String(input.twoUpMinEnergy));
    form.append('Isotope_switch', input.isotopeSwitch);
    form.append('LHL_threshold', String(input.halfLifeThreshold));
    form.append('NF_switch', input.nuclearFermionSwitch);
    form.append('AF_switch', input.atomicFermionSwitch);
    form.append('Dimer_switch', input.dimersSwitch);
    form.append('order_by_N', input.nuclidesSort);
    form.append('order_by_R', input.reactionSort);
    form.append('query', input.coreQuery);

    let index = 0;
    if (input.leftElements) form.append(`sql_tables[${index++}]`, 'left');
    if (input.originalElements) form.append(`sql_tables[${index++}]`, 'none');
    if (input.rightElements) form.append(`sql_tables[${index++}]`, 'right');
    return form;
  };

}
