import { Injectable, inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ICascadesAllForm } from '../core/models/cascades-all-form.model';
import { CrudService } from '../core/services/crud.service';
import {
  getMatchingString,
  getMatchingStrings,
  stringifyFormData
} from '../core/services/helpers';
import { AppConfigService } from '../core/config/app-config.service';

@Injectable()
export class CascadesService {
  config: AppConfigService = inject(AppConfigService);
  crud: CrudService = inject(CrudService);
  page = 'CascadesAll.php';
  equalScan = '=\\s*(.+)';
  colonScan = ':\\s*(.+)';
  quoteScan = '"(.+)"\\.\\s+?(.+)\\.';

  constructor() {}

  getCascadesAllResponse = (form: ICascadesAllForm): Observable<string> => {
    const request: FormData = this.asCascadesAllFormData(form);
    const formString = stringifyFormData(request);

    if (!this.config.production) {
      const text = localStorage.getItem(this.page);
      if (text) {
        return of(text);
      } else {
        return this.crud
          .postPage(this.page, formString)
          .pipe(tap((rsp) => localStorage.setItem(this.page, rsp)));
      }
    } else {
      return this.crud.postPage(this.page, formString);
    }
  };

  parseCascadesAllResponse = (html: string): ICascadesAllForm => {
    const result = {} as ICascadesAllForm;
    const parser = new DOMParser();
    const document: Document = parser.parseFromString(html, 'text/html');
    const form = document.body.querySelector('form#f');
    if (form) {
      document.body.removeChild(form);
    }

    const pElements = Array.from(document.body.getElementsByTagName('p'));
    const targetLink: HTMLAnchorElement = document.body.querySelector(
      'a[href*="/results"]'
    ) as HTMLAnchorElement;
    const url: URL = new URL(targetLink.href);

    result.resultsLink = url.pathname;

    const paragraphs: string[] = [];
    for (let par of pElements) {
      if (par.textContent) paragraphs.push(par.textContent);
    }

    let para: string | undefined = paragraphs.find((item) =>
      item.startsWith('Full Starting Query on the Fusion')
    );
    if (para) {
      const matches = getMatchingStrings(para, this.quoteScan);
      result.fusionQuery = matches[0];
      result.fusionResults = matches[1];
    }

    para = paragraphs.find((item) =>
      item.startsWith('Full Starting Query on the TwoToTwo')
    );
    if (para) {
      const matches = getMatchingStrings(para, this.quoteScan);
      result.twoUpQuery = matches[0];
      result.twoUpResults = matches[1];
    }
    para = paragraphs.find((item) => item.startsWith('Core Fuel List'));
    if (para) {
      result.startingFuel = getMatchingString(para, this.equalScan);
    }

    para = paragraphs.find((item) => item.startsWith('Fusion Table used'));
    if (para) {
      result.fusionTable = getMatchingString(para, this.equalScan);
    }
    para = paragraphs.find((item) => item.startsWith('2-2 Table used'));
    if (para) {
      result.twoUpTable = getMatchingString(para, this.equalScan);
    }
    para = paragraphs.find((item) =>
      item.startsWith('Maximmum number of nuclei allowed')
    );
    if (para) {
      result.maxNuclei = +getMatchingString(para, this.equalScan);
    }
    para = paragraphs.find((item) =>
      item.startsWith('Maximum number of loops')
    );
    if (para) {
      result.maxLoops = +getMatchingString(para, this.equalScan);
    }
    para = paragraphs.find((item) =>
      item.startsWith('Maximum Reactor Temperature')
    );
    if (para) {
      result.maxReactorTemp = +getMatchingString(para, this.equalScan);
    }
    para = paragraphs.find((item) =>
      item.startsWith('Elements that will NOT have MELTED')
    );
    if (para) {
      result.meltingSwitch = getMatchingString(para, this.colonScan);
    }
    para = paragraphs.find((item) =>
      item.startsWith('Elements that WILL have BOILED')
    );
    if (para) {
      result.boilingSwitch = getMatchingString(para, this.colonScan);
    }
    para = paragraphs.find((item) =>
      item.startsWith('Minimum energy (MeV) for any Fusion reaction')
    );
    if (para) {
      result.fusionMinEnergy = +getMatchingString(para, this.equalScan);
    }
    para = paragraphs.find((item) =>
      item.startsWith('Minimum energy (MeV) for any 2-2 reaction')
    );
    if (para) {
      result.twoUpMinEnergy = +getMatchingString(para, this.equalScan);
    }
    para = paragraphs.find((item) => item.startsWith('Radioactive Isotopes'));
    if (para) {
      result.isotopeSwitch = getMatchingString(para, this.colonScan);
    }
    para = paragraphs.find((item) => item.startsWith('LHL threshold'));
    if (para) {
      result.halfLifeThreshold = +getMatchingString(para, this.equalScan);
    }
    para = paragraphs.find((item) => item.startsWith('Nuclear Fermions'));
    if (para) {
      result.nuclearFermionSwitch = getMatchingString(para, this.colonScan);
    }
    para = paragraphs.find((item) => item.startsWith('Atomic Fermions'));
    if (para) {
      result.atomicFermionSwitch = getMatchingString(para, this.colonScan);
    }
    para = paragraphs.find((item) => item.includes('Dimers'));
    if (para) {
      result.dimersSwitch = getMatchingString(para, this.colonScan);
    }
    para = paragraphs.find((item) =>
      item.includes('order by which the Nuclei Table')
    );
    if (para) {
      result.nuclidesSort = getMatchingString(para, this.equalScan);
    }
    para = paragraphs.find((item) =>
      item.includes('order by which the Reactions Table')
    );
    if (para) {
      result.reactionSort = getMatchingString(para, this.equalScan);
    }
    para = paragraphs.find((item) => item.startsWith('The program looked for'));
    if (para) {
      result.progressMessageOne = para;
    }
    para = paragraphs.find((item) =>
      item.startsWith('Thus the program looked for')
    );
    if (para) {
      result.progressMessageTwo = para;
    }
    para = paragraphs.find((item) => item.startsWith('Duration'));
    if (para) {
      result.duration = getMatchingString(para, this.equalScan);
    }
    console.log('result', result);
    return result;
  };

  // TODO:
  //
  /**
     * Full Starting Query on the Fusion table: "select * from FusionAllPlus where E1 = 'H' and (E2 = 'Ni') and MeV >= 5". 6 rows were found.

Full Starting Query on the TwoToTwo table: "select * from TwoToTwoAllPlus where E1 = 'H' and (E2 = 'Ni') and MeV >= 5". Sorry, no rows were found. Please check your starting command.

Core Fuel List = H1 Ni58 Ni59 Ni60 Ni61 Ni62 Ni64
Input used for this run on 31-Jul-2023 06:44:17 (NZT):

Fusion Table used = FusionAll

2-2 Table used = TwoToTwoAll

Maximmum number of nuclei allowed in all pairings as inputs to both the Fusion and the TwoToTwo (2-2) reaction tables = 100

Maximum number of loops allowed for the recursion process = 3

Maximum Reactor Temperature (Kelvin) = 2400

Elements that will NOT have MELTED at Maximum Reactor Temperature: Feedback Core Fuel Only

Elements that WILL have BOILED before Maximum Reactor Temperature: Feedback All

Minimum energy (MeV) for any Fusion reaction that was counted = 5

Minimum energy (MeV) for any 2-2 reaction that was counted = 5

Radioactive Isotopes: Feedback All

LHL threshold below which nuclides were counted as Radioactive Isotopes = 18

Nuclear Fermions: Feedback Core Fuel Only

Atomic Fermions: Feedback Core Fuel Only

Elements H, D, N, O, F, Cl, Br, I, Li, Na, Rb and Cr, being able to form Dimers (always Bosonic): Feedback All

SQL compatible string for the order by which the Nuclei Table is presented = order by Z, A

SQL compatible string for the order by which the Reactions Table is presented = order by MeV desc
*/

  asCascadesAllFormData = (input: ICascadesAllForm): FormData => {
    const form = new FormData();
    form.append('doit', 'execute_query');
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
