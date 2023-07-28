import { Injectable, inject } from '@angular/core';
import { ICascadesAllForm } from '../core/models/cascades-all-form.model';
import { CrudService } from '../core/services/crud.service';
import { Observable, of } from 'rxjs';
import { asFormData, getFormDataString } from '../core/services/helpers';
import { ICascadesAllRequestModel } from '../cascades/cascades-all-request.model';
@Injectable({
  providedIn: 'root'
})
export class CascadesService {
  crud: CrudService = inject(CrudService);

  cascadesAllPage = 'CascadesAll.php';
  constructor() {}

  getCascadesAllResults = (form: ICascadesAllForm): Observable<string> => {
    const legacy = this.asLegacyForm(form);
    const formData = asFormData(legacy);
    const formString  =  this.asFormDataString(formData);
    console.log('legacy', legacy);
    console.log('formData', formData);
    console.log('formString', formString);
    return of('testing'); // this.crud.postPage(this.cascadesAllPage, formData);
  };

  parseCascadesAllResults = (html: string): string => {
    // TODO:
    //
    return 'link';
  };

  asFormDataString = (input: any): string => {
    return getFormDataString(input);
  };

  asLegacyForm = (input: ICascadesAllForm): ICascadesAllRequestModel => {
    const result: ICascadesAllRequestModel = {
      table_set: input.tableSet,
      max_nuclei: input.maxNuclei,
      max_loops: input.maxLoops,
      max_reactor_temp: input.maxReactorTemp,
      Melting_switch: input.meltingSwitch,
      Boiling_switch: input.boilingSwitch,
      min_MeV_F: input.fusionMinEnergy,
      min_MeV_T: input.twoUpMinEnergy,
      Isotope_switch: input.isotopeSwitch,
      LHL_threshold: input.halfLifeThreshold,
      NF_switch: input.nuclearFermionSwitch,
      AF_switch: input.atomicFermionSwitch,
      Dimer_switch: input.dimersSwitch,
      order_by_N: input.nuclidesSort,
      order_by_R: input.reactionSort,
      query: input.coreQuery,
      sql_tables: []
    }
    if (input.leftElements) result.sql_tables.push('LEFT');
    if (input.originalElements) result.sql_tables.push('NONE');
    if (input.rightElements) result.sql_tables.push('RIGHT');
    return result;
  };

  asCascadesAllFormData = (input: ICascadesAllForm): any => {
    const form = {
      doit: 'execute_query',
      table_set: input.tableSet,
      max_nuclei: input.maxNuclei,
      max_loops: input.maxLoops,
      max_reactor_temp: input.maxReactorTemp,
      Melting_switch: input.meltingSwitch,
      Boiling_switch: input.boilingSwitch,
      min_MeV_F: input.fusionMinEnergy,
      min_MeV_T: input.twoUpMinEnergy,
      Isotope_switch: input.isotopeSwitch,
      LHL_threshold: input.halfLifeThreshold,
      NF_switch: input.nuclearFermionSwitch,
      AF_switch: input.atomicFermionSwitch,
      Dimer_switch: input.dimersSwitch,
      order_by_N: input.nuclidesSort,
      order_by_R: input.reactionSort,
      query: input.coreQuery,
      sql_tables: ['']
    };
    if (input.leftElements) form.sql_tables.push(input.leftElements);
    if (input.originalElements) form.sql_tables.push(input.originalElements);
    if (input.rightElements) form.sql_tables.push(input.rightElements);
    form.sql_tables = form.sql_tables.splice(0, 0);
    return form;
  };
}
